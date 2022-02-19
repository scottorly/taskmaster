
const props = {
    description: "iOS UI programming with Swift Concurrency.",
    title: "TASKMASTER",
    image: "https://github.com/scottorly/taskmaster/raw/main/thumbnail.png",
    favicon: "https://raw.githubusercontent.com/scottorly/scottorly.github.io/main/fav.png",
    url: "https://scottorly.github.io/taskmaster",
    twitter: "@orlyck"
}

export default <>
    <link rel="icon" type="image/x-icon" href={props.favicon} />
    <meta name="Description" content={props.description}/>
    <meta name="twitter:title" content={props.title}/>
    <meta name="twitter:description" content={props.description}/>
    <meta name="twitter:image" content={props.image}/>
    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:site" content={props.url}/>
    <meta name="twitter:creator" content={props.twitter}/>
    <meta property="og:url" content={props.url}/>
    <meta property="og:title" content={props.title}/>
    <meta property="og:description" content={props.description}/>
    <meta property="og:image" content={props.image}/>
    <meta property="og:image:secure" content={props.image}/>
</>