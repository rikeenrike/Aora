import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { icons } from '@/constants';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';

interface Creator {
    username: string;
    avatar: string;
}

interface Video {
    title: string;
    thumbnail: string;
    video: string;
    users: Creator;
}

interface VideoCardProps {
    video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
    const { title, thumbnail, video: videoUrl } = video;
    const { username, avatar } = video.users;

    const player = useVideoPlayer(videoUrl, (player) => {
        console.log("loaded")
    });

    const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });



    return (
        <View className='flex-col items-center px-4 mb-14'>
            <View className='flex-row gap-3 items-start'>
                <View className='justify-center items-center flex-row flex-1'>
                    <View className='w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-.5'>
                        <Image
                            source={{ uri: avatar }}
                            className='w-full h-full rounded-lg'
                            resizeMode='cover'
                        />
                    </View>
                    <View className='justify-center flex-1  ml-3 gap-y-1'>

                        <Text className='text-white font-psemibold text-sm' numberOfLines={1}>{title}</Text>
                        <Text className='text-xs text-gray-100 font-pregular' numberOfLines={1}>{username}</Text>
                    </View>
                </View>
                <View className='pt-2'>
                    <Image
                        source={icons.menu}
                        className='w-5 h-5'
                        resizeMode='contain'
                    />
                </View>
            </View>

            {isPlaying ? (
                <VideoView
                    player={player}
                    style={{ width: "100%" , height: 208, borderRadius: 12, marginTop: 12 }}
                    allowsFullscreen
                    allowsPictureInPicture
                />
            ) : (
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                        if (isPlaying) {
                            player.pause();
                        } else {
                            player.play();
                        }
                    }}
                    className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'>
                    <Image
                        source={{ uri: thumbnail }}
                        className='w-full h-full rounded-xl '
                        resizeMode='cover'
                    />
                    <Image
                        source={icons.play}
                        className='w-12 h-12 absolute'
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            )}

        </View>
    );
}

export default VideoCard;