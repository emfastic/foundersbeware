import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import PostModal from "./PostModal";

function Header({ count, setCount }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      bg="#F9F9F9"
      p={4}
      justify={["space-between", "space-between", "space-between"]}
      align="center"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex={"10"}
    >
      <Button
        leftIcon={<AddIcon />}
        size={["md", "lg", "lg"]}
        justifyContent="left"
        onClick={onOpen}
        bg="#FF0000"
        _hover={{
          backgroundColor: "#CC0000",
        }}
        color="#FFF"
      >
        Add a VC
      </Button>

      <PostModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        count={count}
        setCount={setCount}
      />

      <Heading as="h1" size={["md", "lg", "xl"]} textAlign="center">
        📈 VC Chronicles 📉
      </Heading>
    </Flex>
  );
}

export default Header;
