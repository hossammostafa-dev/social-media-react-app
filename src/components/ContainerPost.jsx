/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Container } from "@mui/material";
import Post from "./Post";
import Loading from "./Loading";
import { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const ContainerPost = () => {
  const [posts, setPosts] = useState([]); 
  const [page, setPage] = useState(1); 
  const [hasMore, setHasMore] = useState(true); // Flag for infinite scroll
  const limit = 5; // Number of posts to fetch per request

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `https://tarmeezacademy.com/api/v1/posts?page=${page}&limit=${limit}`
      );
      const newPosts = response.data.data;

      setPosts([...posts, ...newPosts]); // Append new posts to existing ones
      setPage(page + 1); // Increment page number for next request
      setHasMore(newPosts.length === limit); // Check if there are more posts
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []); // Fetch initial posts on component mount
  console.log(posts);

  return (
    <>
      <Container maxWidth="sm">
        <Box sx={{ mt: 6, flexGrow: 2, transition: "0.25" }}>
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchPosts}
            hasMore={hasMore}
            loader={<Loading />} // Replace with your loading component
            endMessage={
              !hasMore && (
                <p style={{ textAlign: "center" }}>reached the end of posts.</p>
              )
            }
          >
            {posts.map((post) => (
              <Post
                key={post.id}
                profil_image={post.author.profile_image}
                userName={post.author.username}
                created_at={post.created_at}
                image={post.image}
                title={post.title}
                body={post.body}
                authorId={post.author.id}
                comments_count={post.comments_count}
                isProfile={false}
                postId={post.id}
              />
            ))}
          </InfiniteScroll>
        </Box>
      </Container>
    </>
  );
};
export default ContainerPost;
