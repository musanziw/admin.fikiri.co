interface VideoProps {
    link: string;
}

export function VideoPlayer({ link }: VideoProps) {
    const embedId = link.split('v=')[1];
    return (
        <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${embedId}`}
            title="Video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
        </iframe>
    )
}