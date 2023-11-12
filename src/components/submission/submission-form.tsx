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
import { motion } from "framer-motion";

const motionProps = {
  initial: { scale: 0.6, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.6, delay: 0.1, type: "tween" },
};

export default function SubmissionForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <motion.section className="my-5 lg:my-12 mx-1 w-full flex flex-col items-center">
      <motion.div {...motionProps}>
        <Button onPress={onOpen} color="primary" size="lg">
          Submit your GPT
        </Button>
      </motion.div>
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
    </motion.section>
  );
}
