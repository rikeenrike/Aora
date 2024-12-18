import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants';
import SearchInput from '@/components/SearchInput';
import Trending from '@/components/Trending';
import EmptyState from '@/components/EmptyState';
import { getallPost, getLatestPost } from '@/lib/appwrite';
import { useAppwritehook } from '@/hooks/useAppwritehook';
import VideoCard from '@/components/VideoCard';
import { useGlobalContext } from '@/context/globalprovider';




const Home = () => {
  const [refreshing, setRefreshing] = useState(false)
  const { data: posts, refetch } = useAppwritehook(getallPost)
  const { data: latestposts } = useAppwritehook(getLatestPost)
  const { user } = useGlobalContext();

  const onRefresh = async () => {
    setRefreshing(true)
    console.log('refreshing')
    await refetch()
    setRefreshing(false)
  }


  return (
    <SafeAreaView className='bg-primary h-full '>
      <FlatList
        data={Array.isArray(posts) ? posts : []}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (

          <VideoCard
            video={item}
          />
        )}
        ListHeaderComponent={() => (
          <View className='my-6 px-4 space-y-6'>
            <View className='justify-between items-start flex-row flex-grow mb-6'>
              <View className=''>
                <Text className='font-pmedium text-sm text-gray-100'>
                  Welcome back
                </Text>
                <Text className='text-2xl font-semibold text-gray-100'>
                  {user?.username}
                </Text>
              </View>
              <View className='mt-1.5'>
                <Image
                  source={images.logoSmall}
                  className='w-9 h-10'
                  resizeMode='contain'
                />
              </View>
            </View>

            <SearchInput />

            <View className='w-full flex-1 pt-5 pb-8'>
              <Text className='text-gray-100 text-lg font-pregular mb-3'>Latest Videos</Text>
              <Trending
                posts={Array.isArray(latestposts) ? latestposts : []}

              />
            </View>

          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No videos found'
            description='There are no videos available at the moment.'
          />
        )
        }

        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </SafeAreaView>
  )
}

export default Home
