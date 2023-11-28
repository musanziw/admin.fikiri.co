'use client'

import React from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

interface VideoProps {
    link: string;
}

export function VideoPlayer({ link }: VideoProps) {

    const videoId = link.split('v=')[1];

    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        event.target.pauseVideo();
    }

    const opts: YouTubeProps['opts'] = {
        height: '300',
        width: '100%',
        playerVars: {
            autoplay: 1,
            controls: 1,
        },
    };

    return <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />
}