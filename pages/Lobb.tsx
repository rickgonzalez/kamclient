import {
    Box,
    Button,
    Center,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    List,
    ListIcon,
    ListItem,
    Spacer,
    Stat,
    StatLabel,
    StatNumber,
  } from '@chakra-ui/react'
  import { MdBook } from 'react-icons/md'
  import React, { useState } from 'react'

  
//   const AddPost = () => {
//     const initialValue: Post = { id: uuid(), name: '' }
//     const [post, setPost] = useState(initialValue)
//     const [addPost, { isLoading }] = useAddPostMutation()
  
//     const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
//       setPost((prev) => ({
//         ...prev,
//         [target.name]: target.value,
//       }))
//     }
  
//     const handleAddPost = () => addPost(post).then(() => setPost(initialValue))
  
//     return (
//       <Flex p={5}>
//         <Box flex={10}>
//           <FormControl isInvalid={Boolean(post.name.length < 3 && post.name)}>
//             <FormLabel htmlFor="name">Post name</FormLabel>
//             <Input
//               id="name"
//               name="name"
//               placeholder="Enter post name"
//               value={post.name}
//               onChange={handleChange}
//             />
//           </FormControl>
//         </Box>
//         <Spacer />
//         <Box>
//           <Button
//             mt={8}
//             colorScheme="purple"
//             isLoading={isLoading}
//             onClick={handleAddPost}
//           >
//             Add Post
//           </Button>
//         </Box>
//       </Flex>
//     )
//   }
  
  const PostList = () => {
    const { data: posts, isLoading } = useGetPostsQuery()
    const navigate = useNavigate()
  
    if (isLoading) {
      return <div>Loading</div>
    }
  
    if (!posts) {
      return <div>No posts :(</div>
    }
  
    return (
      <List spacing={3}>
        {posts.map(({ id, name }) => (
          <ListItem key={id} onClick={() => navigate(`/posts/${id}`)}>
            <ListIcon as={MdBook} color="green.500" /> {name}
          </ListItem>
        ))}
      </List>
    )
  }
  
  const PostNameSubscribed = ({ id }: { id: string }) => {
    const { data, isFetching } = useGetPostQuery(id)
    const navigate = useNavigate()
  
    console.log('data', data, isFetching)
  
    if (!data) return null
  
    return (
      <ListItem key={id} onClick={() => navigate(`/posts/${id}`)}>
        <ListIcon as={MdBook} color="green.500" /> {data.name}
      </ListItem>
    )
  }
  const PostListSubscribed = () => {
    const { data: posts, isLoading } = useGetPostsQuery()
  
    if (isLoading) {
      return <div>Loading</div>
    }
  
    if (!posts) {
      return <div>No posts :(</div>
    }
  
    return (
      <List spacing={3}>
        {posts.map(({ id }) => (
          <PostNameSubscribed id={id} key={id} />
        ))}
      </List>
    )
  }
  
  export const PostsCountStat = () => {
   // const { data: posts } = useGetPostsQuery()
  
   // if (!posts) return null
  
    return (
      <Stat>
        <StatLabel>Active Posts</StatLabel>
        <StatNumber>3</StatNumber>
      </Stat>
    )
  }
  
  export const PostsManager = () => {
    return (
      <Box>
        <Flex bg="#011627" p={4} color="white">
          <Box>
            <Heading size="xl">Manage Posts</Heading>
          </Box>
          <Spacer />
          <Box>
            <PostsCountStat />
          </Box>
        </Flex>


        <Divider />


        <p>This was the add post lists</p>
        <Divider />

        <Flex wrap="wrap">
          <Box flex={1} borderRight="1px solid #eee">
            <Box p={4} borderBottom="1px solid #eee">
              <Heading size="sm">Posts</Heading>
            </Box>
            <Box p={4}>
              <p>this is the posts</p>
            </Box>
            <Box p={4} borderBottom="1px solid #eee">
              <Heading size="sm">Posts (subscribed)</Heading>
            </Box>
            <Box p={4}>
            <p>These are the ones subscribed</p>
            </Box>
          </Box>
          <Box flex={2}>
          <p>I think this was the larger box where rooms would go</p>
          <p>I think this was the larger box where rooms would go</p>
          <p>I think this was the larger box where rooms would go</p>
          <p>I think this was the larger box where rooms would go</p>
          </Box>
        </Flex>
      </Box>
    )
  }
  
  export default PostsManager
  