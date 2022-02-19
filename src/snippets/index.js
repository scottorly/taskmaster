const network = `import UIKit

enum NetworkError: Error {
    case httpError(Error)
}

class Network {

    //simulate a network call
    func fetchList() async -> Result<[String], NetworkError> {
        do {
            try await Task.sleep(nanoseconds: 2 * 1_000_000_000)
        } catch let error {
            return .failure(.httpError(error))
        }
        return .success(["foo", "bar"])
    }

}`

const viewmodel = `@MainActor
class ViewModel {

    @Published var list: [String] = []
    @Published var errorMessage: String? = nil

    let network: Network

    init(network: Network) {
        self.network = network
        getList()
    }

    func getList()  {
        Task {
            let response =  await network.fetchList()
            if case .success(let listResponse) = response {
                list += listResponse
            } else if case .failure(let error) = response {
                errorMessage = error.localizedDescription
            }
        }
    }
}`

const viewcontroller = `class ViewController: UIViewController {

    let viewModel: ViewModel = ViewModel(network: Network())
    var bag: Set<AnyCancellable> = .init()

    override func viewDidLoad() {
        super.viewDidLoad()
        bind()
    }

    func bind() {
        viewModel.$list.sink { list in
            print(list)
        }.store(in: &bag)
    }
}`

const mainactor = `Task { @MainActor in

}
`


export { network, viewmodel, viewcontroller, mainactor }