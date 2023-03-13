import {
  VStack,
  Heading,
  Box,
  Link,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Tag,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Header from "../../components/Header";
import CustomHead from "../../components/CustomHead";

export default function Home() {
  const [posts, setPosts] = useState<any>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function getPosts() {
      const { data, error } = await supabase.from("posts").select("*");

      if (!data) {
        console.log(error);
      } else {
        console.log(data);
        setPosts(data);
      }
    }
    getPosts();
  }, [count]);

  return (
    <>
      <CustomHead />

      <Box mb="10">
        <Header count={count} setCount={setCount} />
      </Box>
      <Box mt="20">
        <VStack spacing={4} mb="4" overflowY={"scroll"}>
          {posts.map((item: any) => (
            <Card key={item.id} width={["sm", "md", "xl"]}>
              <CardHeader>
                <Flex justify={"space-between"} align="center">
                  <Box>
                    <Heading size="md" mb="1">
                      {item.name}
                    </Heading>
                    <Heading size="sm">@ {item.company}</Heading>
                  </Box>
                  <Tag
                    colorScheme={item.type === "Helpful" ? "green" : "red"}
                    variant="subtle"
                    size="lg"
                  >
                    {item.type.toUpperCase()}
                  </Tag>
                </Flex>
              </CardHeader>
              <CardBody>{item.story}</CardBody>
              <CardFooter>
                <Box>
                  <Link href={item.link} isExternal color="teal" fontSize="xl">
                    {item.name}&apos;s Social Media
                  </Link>
                </Box>
              </CardFooter>
            </Card>
          ))}
        </VStack>
      </Box>
    </>
  );
}
