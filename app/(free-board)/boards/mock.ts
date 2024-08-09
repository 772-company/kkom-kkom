import {
  GetArticlesArticleIdCommentsResponse,
  GetArticlesResponse,
} from "@/lib/apis/type";

export const articles: GetArticlesResponse = {
  totalCount: 10,
  list: [
    {
      updatedAt: "2024-08-04T08:55:10.000Z",
      createdAt: "2024-08-04T07:40:05.000Z",
      likeCount: 12,
      writer: {
        nickname: "user3",
        id: 4,
      },
      image: "/icons/heart.svg",
      title: "세 번째 게시글 제목입니다.",
      id: 4,
    },
    {
      updatedAt: "2024-08-05T17:00:15.000Z",
      createdAt: "2024-08-05T15:45:00.000Z",
      likeCount: 11,
      writer: {
        nickname: "user10",
        id: 11,
      },
      image: "/icons/heart.svg",
      title: "열 번째 게시글 제목입니다.",
      id: 11,
    },
    {
      updatedAt: "2024-08-05T09:30:55.000Z",
      createdAt: "2024-08-05T08:20:40.000Z",
      likeCount: 10,
      writer: {
        nickname: "user6",
        id: 7,
      },
      image: "/icons/heart.svg",
      title: "여섯 번째 게시글 제목입니다.",
      id: 7,
    },
    {
      updatedAt: "2024-08-05T13:40:35.000Z",
      createdAt: "2024-08-05T12:25:20.000Z",
      likeCount: 9,
      writer: {
        nickname: "user8",
        id: 9,
      },
      image: "/icons/heart.svg",
      title: "여덟 번째 게시글 제목입니다.",
      id: 9,
    },
    {
      updatedAt: "2024-08-03T14:20:45.000Z",
      createdAt: "2024-08-03T12:30:15.000Z",
      likeCount: 8,
      writer: {
        nickname: "user2",
        id: 3,
      },
      image: "/icons/heart.svg",
      title: "두 번째 게시글 제목입니다.",
      id: 3,
    },
    {
      updatedAt: "2024-08-05T15:20:50.000Z",
      createdAt: "2024-08-05T14:05:35.000Z",
      likeCount: 7,
      writer: {
        nickname: "user9",
        id: 10,
      },
      image: "/icons/heart.svg",
      title: "아홉 번째 게시글 제목입니다.",
      id: 10,
    },
    {
      updatedAt: "2024-08-04T12:25:40.000Z",
      createdAt: "2024-08-04T11:15:25.000Z",
      likeCount: 6,
      writer: {
        nickname: "user5",
        id: 6,
      },
      image: "/icons/heart.svg",
      title: "다섯 번째 게시글 제목입니다.",
      id: 6,
    },
    {
      updatedAt: "2024-08-03T10:15:30.000Z",
      createdAt: "2024-08-03T09:45:20.000Z",
      likeCount: 5,
      writer: {
        nickname: "user1",
        id: 2,
      },
      image: "/icons/heart.svg",
      title: "첫 번째 게시글 제목입니다.",
      id: 2,
    },
    {
      updatedAt: "2024-08-04T10:45:25.000Z",
      createdAt: "2024-08-04T09:35:10.000Z",
      likeCount: 4,
      writer: {
        nickname: "user4",
        id: 5,
      },
      image: "/icons/heart.svg",
      title: "네 번째 게시글 제목입니다.",
      id: 5,
    },
    {
      updatedAt: "2024-08-05T11:10:20.000Z",
      createdAt: "2024-08-05T10:00:05.000Z",
      likeCount: 3,
      writer: {
        nickname: "user7",
        id: 8,
      },
      image: "/icons/heart.svg",
      title: "일곱 번째 게시글 제목입니다.",
      id: 8,
    },
  ],
};

export const comments: GetArticlesArticleIdCommentsResponse = {
  nextCursor: 10,
  list: [
    {
      writer: {
        image: "/icons/heart.svgng",
        nickname: "user10",
        id: 10,
      },
      updatedAt: "2024-08-07T10:00:00.000Z",
      createdAt: "2024-08-07T09:00:00.000Z",
      content: "content_10",
      id: 10,
    },
    {
      writer: {
        image: "/icons/heart.svgg",
        nickname: "user9",
        id: 9,
      },
      updatedAt: "2024-08-06T14:20:00.000Z",
      createdAt: "2024-08-06T13:20:00.000Z",
      content: "content_9",
      id: 9,
    },
    {
      writer: {
        image: "/icons/heart.svgg",
        nickname: "user8",
        id: 8,
      },
      updatedAt: "2024-08-05T16:45:00.000Z",
      createdAt: "2024-08-05T15:45:00.000Z",
      content: "content_8",
      id: 8,
    },
    {
      writer: {
        image: "/icons/heart.svgg",
        nickname: "user7",
        id: 7,
      },
      updatedAt: "2024-08-04T18:30:00.000Z",
      createdAt: "2024-08-04T17:30:00.000Z",
      content: "content_7",
      id: 7,
    },
    {
      writer: {
        image: "/icons/heart.svgg",
        nickname: "user6",
        id: 6,
      },
      updatedAt: "2024-08-03T12:00:00.000Z",
      createdAt: "2024-08-03T11:00:00.000Z",
      content: "content_6",
      id: 6,
    },
    {
      writer: {
        image: "/icons/heart.svgg",
        nickname: "user5",
        id: 5,
      },
      updatedAt: "2024-08-02T09:15:00.000Z",
      createdAt: "2024-08-02T08:15:00.000Z",
      content: "content_5",
      id: 5,
    },
    {
      writer: {
        image: "/icons/heart.svgg",
        nickname: "user4",
        id: 4,
      },
      updatedAt: "2024-08-01T21:00:00.000Z",
      createdAt: "2024-08-01T20:00:00.000Z",
      content: "content_4",
      id: 4,
    },
    {
      writer: {
        image: "/icons/heart.svgg",
        nickname: "user3",
        id: 3,
      },
      updatedAt: "2024-07-31T19:45:00.000Z",
      createdAt: "2024-07-31T18:45:00.000Z",
      content: "content_3",
      id: 3,
    },
    {
      writer: {
        image: "/icons/heart.svgg",
        nickname: "user2",
        id: 2,
      },
      updatedAt: "2024-07-30T17:30:00.000Z",
      createdAt: "2024-07-30T16:30:00.000Z",
      content: "content_2",
      id: 2,
    },
    {
      writer: {
        image: "/icons/heart.svgg",
        nickname: "user1",
        id: 1,
      },
      updatedAt: "2024-07-29T15:15:00.000Z",
      createdAt: "2024-07-29T14:15:00.000Z",
      content: "content_1",
      id: 1,
    },
  ],
};
