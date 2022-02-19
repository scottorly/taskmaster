
let marginNoteId = 0
let sideNoteId = 0

const MarginNote = ({ children }) => {
    marginNoteId++
    return (<>
        <label for={marginNoteId} className="margin-toggle">&#8853;</label>
        <input type="checkbox" id={marginNoteId} className="margin-toggle"/>
        <span className="marginnote">
            { children }
        </span>
    </>)
}

const SideNote = ({ children }) => {
    sideNoteId++
    return <>
            <label for={`${sideNoteId}a`} className="margin-toggle sidenote-number"/>
            <input type="checkbox" id={`${sideNoteId}a`} className="margin-toggle"/>
            <span className="sidenote">
                { children }
            </span>
        </>
}

export { MarginNote, SideNote }