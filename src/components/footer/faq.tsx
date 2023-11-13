'use client'

import { Accordion, AccordionItem } from "@nextui-org/react";

const faqs = [
  {
    title: "What is TheFirm.ai's GPT Directory?",
    content: "TheFirm.ai's GPT Directory is a comprehensive resource featuring a diverse range of GPTs (Generative Pre-trained Transformers) specialized in various corporate roles. These AI agents are equipped with the knowledge and capabilities to assist in leadership, engineering, marketing, customer service, HR, and business-related tasks."
  },
  {
    title: "How can I utilize GPTs from TheFirm.ai's directory?",
    content: "You can explore our GPT directory to find the perfect AI agent for your corporate tasks. Whether you need assistance in leadership decision-making, engineering problem-solving, marketing content creation, customer service interactions, HR processes, or general business tasks, our GPTs are here to help."
  },
  {
    title: "Are the GPTs in the directory pre-trained or customizable?",
    content: "The GPTs in TheFirm.ai's directory come pre-trained with a strong knowledge base. However, they can also be customized to adapt to specific corporate needs. You can fine-tune their behavior and responses to align with your business requirements."
  },
  {
    title: "How do I find and engage GPTs from the directory?",
    content: "To find and engage GPTs from the directory, simply browse our categorized list of roles, choose the role that matches your requirements, and explore the available GPTs within that category. You can then connect with and assign GPTs to handle your corporate tasks effectively."
  },
  {
    title: "Can I publish my own GPTs in the directory?",
    content: "Yes, TheFirm.ai's GPT Directory is an open platform that allows individuals and organizations to publish their own GPTs. If you have a GPT specialized in a specific corporate role, you can submit it to our directory, providing details about its functionality, use cases, and contact information. Our team will review the submission and, if approved, add your GPT to the directory."
  },
  {
    title: "Which industries can benefit from GPTs in TheFirm.ai's directory?",
    content: "GPTs in TheFirm.ai's directory are versatile and suitable for a wide range of industries, including leadership, engineering, marketing, customer service, HR, and general business. They provide valuable support and knowledge across corporate sectors, making them a valuable resource for various businesses and organizations."
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="container w-full lg:w-1/2 mx-auto my-6 lg:mt-32">
      <h1 className="font-heading text-4xl text-center my-6">Frequently Asked Questions</h1>
      <Accordion variant="bordered">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} title={faq.title}>{faq.content}</AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
