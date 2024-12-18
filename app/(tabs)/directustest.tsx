import { useAppwritehook } from '@/hooks/useAppwritehook';
import { getallPost } from '@/lib/appwrite';
import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View, Button, FlatList, Text } from 'react-native';


export default function VideoScreen() {

    const { data: posts, refetch } = useAppwritehook(getallPost)

    return (
        <FlatList
            data={Array.isArray(posts) ? posts : []}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => 
            <VideoItem videoSource={item.video} 
            />
        }
            contentContainerStyle={styles.listContainer}
        />
    );
}

function VideoItem({ videoSource }) {
    const player = useVideoPlayer(videoSource, (player) => {
        player.loop = true;
        player.play();
    });

    const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

    return (
        <View style={styles.contentContainer}>
            <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
            <View style={styles.controlsContainer}>
                <Button
                    title={isPlaying ? 'Pause' : 'Play'}
                    onPress={() => {
                        if (isPlaying) {
                            player.pause();
                        } else {
                            player.play();
                        }
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        padding: 10,
    },
    contentContainer: {
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    video: {
        width: 350,
        height: 275,
    },
    controlsContainer: {
        marginTop: 10,
    },
});
