import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React, { FC, useState } from 'react'
import * as Animatable from 'react-native-animatable'
import icons from '@/constants/icons'
import { VideoView, useVideoPlayer } from 'expo-video'
import { useEvent } from 'expo'

interface Video {
    [x: string]: string;
    id: string;
    title: string;
    thumbnail: string;
    video: string;
}

interface TrendingProps {
    posts: Video[];
}

interface TrendingItemProps {
    activeItem: Video;
    item: Video;
}

const zoomIn = {
    0: {
        scale: .9,
    },
    1: {
        scale: 1.1,
    },
}
const zoomOut = {
    0: {
        scale: 1,
    },
    1: {
        scale: 0.9,
    },
}



const TrendingItem: FC<TrendingItemProps> = ({ activeItem, item } ) => {

    const player = useVideoPlayer(item.video, (player) => {
        console.log("occured")
    });

    const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

    return (
        <Animatable.View
            className='mr-5'
            animation={activeItem === item.$id ? zoomIn : zoomOut}
            duration={500}
        >
            {isPlaying ? (
                <VideoView
                    player={player}
                    style={{ width: 182, height: 268, borderRadius: 35, overflow: 'hidden', shadowColor: 'black', shadowOpacity: 0.4, shadowRadius: 10 }}
                    allowsFullscreen 
                    allowsPictureInPicture
                    nativeControls
                />
            ) : (
                <TouchableOpacity className="relative justify-center items-center" activeOpacity={0.7} 
                onPress={() => {
                    if (isPlaying) {
                        player.pause();
                    } else {
                        player.play();
                    }
                }}>
                    <ImageBackground
                        className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'
                        source={{ uri: item.thumbnail }}
                        resizeMode='cover'
                    />

                    <Image
                        source={icons.play}
                        className='w-12 h-12 absolute'
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            )}
        </Animatable.View>
    )
}

const Trending: FC<TrendingProps> = ({ posts }) => {
    const [activeItem, setActiveItem] = useState(posts[1])

    const viewableItemsChanged = ({ viewableItems }: { viewableItems: Array<{ item: Video }> }) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key)
        }
    }

    return (
        <FlatList
            contentContainerStyle={{ alignItems: 'center', height: 350 }}

            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <TrendingItem
                    activeItem={activeItem}
                    item={item}
                />
            )}
            horizontal
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
        />
    )
}

export default Trending;