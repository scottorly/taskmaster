import './tufte.module.css'
import Prism from 'prismjs'
import 'prismjs/plugins/line-highlight/prism-line-highlight'
import 'prismjs/components/prism-swift'
import Link from './link'
import Code, { SideCode } from './code'
import { MarginNote, SideNote } from './notes'
import meta from './header'
import { network, viewmodel, viewcontroller, mainactor } from './snippets'
import image from './taskmaster.jpg'

document.head.appendChild(meta)

const blog = (
    <article>
        <section>
            <h1>
                TASKMASTER
            </h1>
            <p className="subtitle">
                <a href='https://scottorly.github.io'>Scott Orlyck</a>
            </p>
        </section>

        <section>
            <figure>
                <MarginNote>
                    New way to dispatch to main dropped.<br />
                    <SideCode snippet={mainactor} />
                    <em>Not that you should ever need to use it.</em>
                </MarginNote>
                <img src={image} alt="Taskmaster in Marvel's Black Widow. (Marvel Studios)"/>
                <em>Black Widow<br />Marvel Studios</em>
                <blockquote>ALL HANDS, ON SIGHT</blockquote>
            </figure>
        </section>

        <section>
            <p>
                <span className='newthought'><Link href="https://scottorly.github.io/drive">First</Link> I demonstrated some practical</span> RxSwift and UIKit UI programming techniques. <Link href="https://scottorly.github.io/drive2combine">Next</Link> I showed you how to do the same thing using Swift's Combine reactive framework and UIKit.           
            </p> 
            <p> 
                Now for something slightly different. Swift's new concurrency language features potentially offer the ability to design clean, minimalist architectures without the burdensome complexity of reactive programming language extensions because while Rx is absurdly powerful, it is not for everyone.
            </p>
            <p>
                Since the earliest days of iOS development, dealing with asynchronous operations was cumbersome and limited by the ancient ways of Objective-C, the target-action/delegate pattern, Model-View-Controller, and the fact that UI update operations are required to use the main thread.
            </p>
            <p>
                In an effort to avoid getting Italian food<SideNote>Spaghetti code is little or no seperation of concerns.</SideNote> all over the walls, alternative architectures for iOS proliferated like memory leaks.
            </p>  
            <p>
                Of course, some took it too far and the result is over-cooked lasagna.<SideNote>The opposite of spaghetti is excessive seperation of concerns.</SideNote> I think the most peculiar MVC avoidance I have encountered was a Promise based Model-View-Presenter pattern in a misguided attempt to mimic the architectures of Javascript web applications in Objective-C. Whatever the case, I think everyone can agree that anything is better than the commonly encountered anti-pattern of relying on NotificationCenter to broadcast the results of asynchronous operations.
            </p>
        </section>
        <section>
            <h2>SWIFT CONCURRENCY</h2>
            <p>
            <MarginNote>
                XCode Playground file with working example available <Link href='https://github.com/scottorly/taskmaster/tree/main/TASKMASTER.playground'>here</Link>.
            </MarginNote>
                The new concurrency language features in Swift are <em>extensive</em> and the selection of tools is overwhelming at first but learn a select few and before you know it you'll be writing functions so linear they'll only look synchronous.
            </p>
            <p>
                There are 4 specific Swift language features or standard library additions that are going to provide the flexibilty for a clean, linear architecture: <Link href='https://docs.swift.org/swift-book/LanguageGuide/Concurrency.htm'>asynchronous functions</Link>, <Link href="https://developer.apple.com/documentation/swift/result"><code>Result</code></Link>, <Link href="https://developer.apple.com/documentation/swift/task"><code>Task</code></Link>, &amp; Actors<SideNote>Specifically the <Link href="https://developer.apple.com/documentation/swift/mainactor"><code>MainActor</code></Link> and the <code>@MainActor</code> attribute.</SideNote>. What I like about this approach is that in addition to the simplicity of asynchronous functions and actors it doesn't require any external dependencies.
            </p>

            <Code snippet={network} dataline={''}>
                <MarginNote>
                A simple mock Network service definition with an asynchronous method that returns a <code>Result</code> type wrapping an error or success case in an associated value. 
                </MarginNote>
            </Code>
            <p>
                Nothing innovative going on above, just catching some Zs to mimic an asynchronous network request. Note the use of the Result type to wrap the response allowing the method to return an error state<SideNote>Async/await also plays nice with Swift error handling via <em>throws</em> if you want to be a <em>try</em>hard.</SideNote>.
            </p>
        </section>
        <section>
            <h2>MAIN ACTOR &amp; UNSTRUCTURED TASK</h2>
            <p>
                This is going to be a short post because these new concurrency features make it dumb easy to handle this stuff now.
            </p>
            <p>
                 Basically all we need to do is define our asynchronous methods on a given service entity that communicates with the ViewModel. Before async/await and actors this would mean that we would have to choose which closure to dispatch to the main thread in or indicate that a Combine publisher would notifify subscribers of events on the main thread. Now just use the <code>@MainActor</code> attribute and wrap an asynchronous method call in an unstructured <code>Task</code> and that is it.
            </p>
            <p>
                There is no stipulation that wrapping asynchronous functions in a <code>Task</code> cannot be used directly in a <code>UIViewController</code> as it already has the <code>@MainActor</code> attribute. Nevertheless, the surprising complexity of seemingly simple real-world production applications always warrants thoughtful consideration to separation of concerns so our code is always tidy, side-effect free, easy to test, easy to debug, and easy to change.
            </p>
            <Code snippet={viewmodel} dataline={''}></Code>
            <p>
                <MarginNote>
                    Readers with a background in Javascript should note that asynchronous functions in Swift are not syntactic sugar around Promises as in ES6, rather async/await is part of the <Link href="https://github.com/apple/swift-evolution/blob/main/proposals/0296-async-await.md">Swift type system</Link>.  
                    <br/>
                    <br/>
                    Swift has a Future type but it is a Combine Publisher and not an implementation of Promises per se.
                </MarginNote>
                The <code>MainActor</code> attribute used together with the <code>Task</code> wrapper means we don't have to worry about manually dispatching to the main queue. <code>Task</code> allows us to call asynchronous methods without capturing weak self and polluting our code with unwrapped optionals all over the place. Returning results wrapped in the <code>Result</code> type provides the flexibilty to preserve success/error states in the UI layer, and finally the <code>Publisher</code> wrapped property provides ready-made outputs for our <code>ViewController</code> to subscribe to.
            </p>
        </section>

        <section>
            <h2>BUT WAIT</h2>
            <p>
                What is the point of this squeaky clean architecture if it isn't tested? What about some more complicated examples using structured concurrency?
            </p>
            <p>
                For that you will have to wait for next time.
            </p>
          
        </section>
        <section>
           
        </section>
        <footer>
            <p>
                Styled with <Link href="https://edwardtufte.github.io/tufte-css/">Tufte-CSS</Link> &amp; <Link href="https://prismjs.com/">PrismJS</Link>
            </p>
        <em>Copyright © 2022 Scott Orlyck. All rights reserved.</em>
        </footer>
    </article>
)

document.body.appendChild(blog)

Prism.highlightAll()