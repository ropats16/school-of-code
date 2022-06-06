import Head from "next/head";
import Link from "next/link";
import { Heading, Flex, Stack } from "@chakra-ui/react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ContentBanner } from "../../components/ContentBanner";
import Image from "next/image";

interface LessonProps {
  lessons: {
    frontMatter: any;
    slug: string;
  }[];
}

const Lessons: React.FC<LessonProps> = ({ lessons }) => {
  return (
    <>
      <Head>
        <title>D_D School of Code</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex as="main" py={5} px={[4, 10, 16]} direction="column">
        <Stack spacing={5} direction="column">
          <Heading
            fontSize={["md", "lg"]}
            as="h2"
            textAlign="center"
            color="#F96C9D"
          >
            SMART CONTRACT DEVELOPMENT TRACK
          </Heading>
          <Heading fontSize={["xs", "sm"]} as="h3" textAlign="center">
            CURRENT LESSONS
          </Heading>
          {/* <Image layout="fill" src="/assets/solidity.png" /> */}
          {lessons.map((lesson: any, idx: number) => (
            <Link href={"/lessons/" + lesson.slug} passHref>
              <ContentBanner lesson={lesson} idx={idx} />
              {/* <p key={lesson.title}>
                  Lesson {idx + 1}: {lesson.frontMatter.title}
                </p> */}
            </Link>
          ))}
        </Stack>
      </Flex>
    </>
  );
};

export default Lessons;

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join("lessons"));
  const lessons = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("lessons", filename),
      "utf-8"
    );
    const { data: frontMatter } = matter(markdownWithMeta);
    return {
      frontMatter,
      slug: filename.split(".")[0],
    };
  });
  return {
    props: {
      lessons,
    },
  };
};
