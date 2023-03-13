import { Search2Icon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  InputGroup,
  Input,
  InputLeftElement,
  Button,
  Box,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function SearchModal({
  isSearchOpen,
  onSearchClose,
  universityList,
  region,
  universityRegionMap,
}: any) {
  const [searchResults, setSearchResults] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);

    if (event.target.value !== "") {
      const filteredUniversities = universityList.filter((university: string) =>
        university.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredUniversities);
    } else {
      setSearchResults([]);
    }
  }

  const searchItems = searchResults.map((university: string) => {
    return (
      <Box
        key={university}
        bg="maroon"
        color="white"
        p="5"
        borderRadius="md"
        cursor={"pointer"}
        fontWeight="semibold"
        _hover={{
          backgroundColor: "#610018",
        }}
        onClick={() => {}}
      >
        {university}
      </Box>
    );
  });

  return (
    <Modal isOpen={isSearchOpen} onClose={onSearchClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalBody p="2" m="0">
          <InputGroup size="lg" w={["xs", "lg"]}>
            <InputLeftElement cursor={"pointer"}>
              <Search2Icon />
            </InputLeftElement>
            <Input
              onChange={handleSearch}
              value={searchQuery}
              placeholder={`Search names`}
              variant="outlined"
            />
          </InputGroup>
          {searchResults.length !== 0 ? (
            <>
              <Divider mb="5" />
              <VStack align="left">{searchItems}</VStack>
            </>
          ) : (
            <></>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
