"use client";

import SubmissionFormModal from "./form";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function SubmissionForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <section className="my-5 lg:my-12 mx-1 w-full flex flex-col items-center">
      <Button onPress={onOpen} color="primary" size="lg">Submit your GPT</Button>
      <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Submit your GPT
              </ModalHeader>
              <ModalBody>
                <SubmissionFormModal onOpenChange={onOpenChange} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}
