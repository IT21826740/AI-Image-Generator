import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AutoAwesome, CreateRounded } from "@mui/icons-material";
import TextInput from "../Input/TextInput";
import Button from "../buttons/button";
import { CreatePost, GenerateImageFromPrompt } from "../../api";
import GeneratedImageCard from "../cards/GeneratedImageCard";

const Form = styled.div`
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 9%;
  justify-content: center;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

const Desc = styled.div`
  font-size: 17px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const Actions = styled.div`
  display: flex;
  flex: 1;
  gap: 8px;
`;

const GenerateImage = ({
  createPostLoading,
  setcreatePostLoading,
  generateImageLoading,
  setGenerateImageLoading,
  post,
  setPost,
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const generateImage = async () => {
    setGenerateImageLoading(true);
    setError("");
    try {
      const res = await GenerateImageFromPrompt({ prompt: post.prompt });
      setPost({
        ...post,
        photo: `data:image/jpeg;base64,${res?.data?.photo}`,
      });
    } catch (error) {
      console.error("Error generating image:", error);
      setError("Error generating image. Please try again.");
    } finally {
      setGenerateImageLoading(false);
    }
  };

  const createPost = async () => {
    setcreatePostLoading(true);
    setError("");
    try {
      await CreatePost(post);
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
      setError("Error creating post. Please try again.");
    } finally {
      setcreatePostLoading(false);
    }
  };

  return (
    <Form>
      <Top>
        <Title>Generate Image with prompt</Title>
        <Desc>Write your prompt according to the image you want to generate!</Desc>
      </Top>
      <Body>
        <TextInput
          label="Author"
          placeholder="Enter your name"
          name="name"
          value={post.name}
          handelChange={(e) => setPost({ ...post, name: e.target.value })}
        />
        <TextInput
          label="Image Prompt"
          placeholder="Write a detailed prompt about the image"
          name="prompt"
          textArea
          rows="8"
          handelChange={(e) => setPost({ ...post, prompt: e.target.value })}
        />
        {post.photo && (
          <GeneratedImageCard src={post.photo} loading={generateImageLoading} />
        )}
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </Body>
      <Actions>
        <Button
          text="Generate Image"
          isLoading={generateImageLoading}
          onClick={generateImage}
          leftIcon={<AutoAwesome />}
        />
        <Button
          text="Create Post"
          isLoading={createPostLoading}
          onClick={createPost}
          leftIcon={<CreateRounded />}
        />
      </Actions>
    </Form>
  );
};

export default GenerateImage;
