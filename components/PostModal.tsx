import { useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import isUrl from "is-url";
import supabase from "../lib/supabaseClient";

function PostModal({ isOpen, onClose, setCount }: any) {
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [link, setLink] = useState("");
  const [nameError, setNameError] = useState(false);
  const [companyNameError, setCompanyNameError] = useState(false);
  const [linkError, setLinkError] = useState(false);
  const [personalStory, setPersonalStory] = useState("");
  const [type, setType] = useState("Helpful");
  const [nameTypeError, setTypeError] = useState(false);
  const toast = useToast();

  const handleNameChange = (event) => {
    if (event.target.value !== "" && nameError) {
      setNameError(false);
    }
    setName(event.target.value);
  };

  const handleCompanyNameChange = (event) => {
    if (event.target.value !== "" && companyNameError) {
      setCompanyNameError(false);
    }
    setCompanyName(event.target.value);
  };

  const handleLinkChange = (event) => {
    if (event.target.value !== "" && linkError) {
      setLinkError(false);
    }
    setLink(event.target.value);
  };

  const handlePersonalStoryChange = (event) => {
    setPersonalStory(event.target.value);
  };

  const handleTypeChange = (event) => {
    if (event.target.value !== "" && nameTypeError) {
      setTypeError(false);
    }
    setType(event.target.value);
  };

  const handleSubmit = async () => {
    let hasError = false;
    if (name === "") {
      setNameError(true);
      hasError = true;
    }
    if (companyName === "") {
      setCompanyNameError(true);
      hasError = true;
    }
    if (link === "" || !isUrl(link)) {
      setLinkError(true);
      hasError = true;
    }
    if (type === "") {
      setTypeError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    if (name !== "" && companyName !== "" && link !== "" && type !== "") {
      const { data, error } = await supabase.from("posts").insert([
        {
          name: name,
          company: companyName,
          link: link,
          story: personalStory,
          type: type,
        },
      ]);

      if (error) {
        toast({
          title: "Error uploading VC.",
          description: "Please try again.",
          status: "error",
          duration: 4000,
        });
      } else {
        toast({
          title: "VC uploaded.",
          description: "Thank you for your contribution!",
          status: "success",
          duration: 4000,
        });
        setCount((count: number) => count + 1);
      }

      handleClose();
    }
  };

  function handleClose() {
    setName("");
    setCompanyName("");
    setLink("");
    setType("");
    setPersonalStory("");
    setNameError(false);
    setCompanyNameError(false);
    setLinkError(false);
    setTypeError(false);
    onClose();
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a VC</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="4">
              <FormControl isRequired isInvalid={nameError}>
                <FormLabel>Name</FormLabel>
                <Input
                  value={name}
                  placeholder="John Doe"
                  onChange={handleNameChange}
                />
                {nameError && (
                  <FormErrorMessage>Please enter a name.</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isRequired isInvalid={companyNameError}>
                <FormLabel>Firm Name</FormLabel>
                <Input
                  value={companyName}
                  placeholder="VC Firm"
                  onChange={handleCompanyNameChange}
                />
                {companyNameError && (
                  <FormErrorMessage>
                    Please enter a company name.
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isRequired isInvalid={linkError}>
                <FormLabel>Social Media Link</FormLabel>
                <Input
                  value={link}
                  onChange={handleLinkChange}
                  placeholder="https://twitter.com/johndoe"
                />
                {linkError && (
                  <FormErrorMessage>
                    Please enter a valid link.
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Personal Story</FormLabel>
                <Textarea
                  value={personalStory}
                  onChange={handlePersonalStoryChange}
                  placeholder="Tell us your story (optional)"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Helpful or Horrible VC</FormLabel>
                <Select value={type} onChange={handleTypeChange} placeholder="">
                  <option value="Helpful">Helpful</option>
                  <option value="Horrible">Horrible</option>
                </Select>
              </FormControl>
            </VStack>{" "}
          </ModalBody>
          <ModalFooter>
            <Button
              bg="#006400"
              _hover={{ backgroundColor: "#008000" }}
              color="white"
              ml={3}
              onClick={handleSubmit}
            >
              Add VC
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PostModal;
