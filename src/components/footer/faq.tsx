'use client'

import { Accordion, AccordionItem } from "@nextui-org/react";

const faqs = [
  {
    title: "What is EduGPTs?",
    content: "The EduGPTs is a comprehensive online resource that lists various GPT (Generative Pre-trained Transformer) models, AI agents, and applications for educational purposes. It's a one-stop destination for finding and exploring AI-driven solutions.",
  },
  {
    "title": "How can I use the EduGPTs for my projects or business?",
    "content": "You can use the EduGPTs to discover AI agents and applications that can enhance your projects or business processes. Browse through the listings, find the right AI tool for your specific needs, and leverage its capabilities to boost productivity and innovation."
  },
  {
    "title": "Are the listings in the directory free to use?",
    "content": "The availability and terms of use for each AI agent or application listed in the directory may vary. Some may offer free access, while others may require licensing or subscription fees. Be sure to check the details provided with each listing."
  },
  {
    "title": "How can I submit my own GPT-powered application to the directory?",
    "content": "To submit your GPT-powered application to the directory, fill out our submission form, providing details about your application's functionality, use cases, and contact information. Our team will review the submission and, if approved, add your application to the directory."
  },
  {
    "title": "Can I find open-source AI projects in the directory?",
    "content": "Yes, you can find open-source AI projects and applications in the directory. We aim to feature a wide range of solutions, both open-source and commercial, to cater to different user preferences and requirements."
  }
]

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
