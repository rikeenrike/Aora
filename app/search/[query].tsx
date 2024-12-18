import { View, Text, FlatList} from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '@/components/SearchInput';
import EmptyState from '@/components/EmptyState';
import { searchPosts } from '@/lib/appwrite';
import { useAppwritehook } from '@/hooks/useAppwritehook';
import VideoCard from '@/components/VideoCard';
import { useLocalSearchParams } from 'expo-router';

const Search = () => {
  const { query } = useLocalSearchParams()
  const { data: posts, refetch } = useAppwritehook(() => searchPosts(query))

  useEffect(() => {
    refetch()
  }, [query])

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
          <View className='my-6 px-4 '>
            <Text className='font-pmedium text-sm text-gray-100'>
              Search Results
            </Text>
            <Text className='text-2xl font-semibold text-gray-100'>
              {query}
            </Text>
            <View className='mt-6 mb-8'>
            <SearchInput initialQuery={Array.isArray(query) ? query.join(' ') : query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No videos found'
            description='No videos found'
          />
        )
        }
      />
    </SafeAreaView>
  )
}

export default Search
