export const articles = {
  totalCount: 10,
  list: [
    {
      updatedAt: "2024-08-03T10:15:30.000Z",
      createdAt: "2024-08-03T09:45:20.000Z",
      likeCount: 5,
      writer: {
        nickname: "user1",
        id: 2,
      },
      image: "image1.png",
      title: "첫 번째 게시글 제목입니다.",
      id: 2,
    },
    {
      updatedAt: "2024-08-03T14:20:45.000Z",
      createdAt: "2024-08-03T12:30:15.000Z",
      likeCount: 8,
      writer: {
        nickname: "user2",
        id: 3,
      },
      image: "image2.png",
      title: "두 번째 게시글 제목입니다.",
      id: 3,
    },
    {
      updatedAt: "2024-08-04T08:55:10.000Z",
      createdAt: "2024-08-04T07:40:05.000Z",
      likeCount: 12,
      writer: {
        nickname: "user3",
        id: 4,
      },
      image: "image3.png",
      title: "세 번째 게시글 제목입니다.",
      id: 4,
    },
    {
      updatedAt: "2024-08-04T10:45:25.000Z",
      createdAt: "2024-08-04T09:35:10.000Z",
      likeCount: 4,
      writer: {
        nickname: "user4",
        id: 5,
      },
      image: "image4.png",
      title: "네 번째 게시글 제목입니다.",
      id: 5,
    },
    {
      updatedAt: "2024-08-04T12:25:40.000Z",
      createdAt: "2024-08-04T11:15:25.000Z",
      likeCount: 6,
      writer: {
        nickname: "user5",
        id: 6,
      },
      image: "image5.png",
      title: "다섯 번째 게시글 제목입니다.",
      id: 6,
    },
    {
      updatedAt: "2024-08-05T09:30:55.000Z",
      createdAt: "2024-08-05T08:20:40.000Z",
      likeCount: 10,
      writer: {
        nickname: "user6",
        id: 7,
      },
      image: "image6.png",
      title: "여섯 번째 게시글 제목입니다.",
      id: 7,
    },
    {
      updatedAt: "2024-08-05T11:10:20.000Z",
      createdAt: "2024-08-05T10:00:05.000Z",
      likeCount: 3,
      writer: {
        nickname: "user7",
        id: 8,
      },
      image: "image7.png",
      title: "일곱 번째 게시글 제목입니다.",
      id: 8,
    },
    {
      updatedAt: "2024-08-05T13:40:35.000Z",
      createdAt: "2024-08-05T12:25:20.000Z",
      likeCount: 9,
      writer: {
        nickname: "user8",
        id: 9,
      },
      image: "image8.png",
      title: "여덟 번째 게시글 제목입니다.",
      id: 9,
    },
    {
      updatedAt: "2024-08-05T15:20:50.000Z",
      createdAt: "2024-08-05T14:05:35.000Z",
      likeCount: 7,
      writer: {
        nickname: "user9",
        id: 10,
      },
      image: "image9.png",
      title: "아홉 번째 게시글 제목입니다.",
      id: 10,
    },
    {
      updatedAt: "2024-08-05T17:00:15.000Z",
      createdAt: "2024-08-05T15:45:00.000Z",
      likeCount: 11,
      writer: {
        nickname: "user10",
        id: 11,
      },
      image: "image10.png",
      title: "열 번째 게시글 제목입니다.",
      id: 11,
    },
  ],
};

export const specificArticle = (id: number) => articles.list[id - 2];

export const comments = {
  nextCursor: 10,
  list: [
    {
      writer: {
        image: "image1.png",
        nickname: "user1",
        id: 1,
      },
      updatedAt: "2024-08-06T09:23:28.007Z",
      createdAt: "2024-08-06T09:23:28.007Z",
      content: "첫 번째 게시글 내용입니다.",
      id: 1,
    },
    {
      writer: {
        image: "image2.png",
        nickname: "user2",
        id: 2,
      },
      updatedAt: "2024-08-06T10:12:18.015Z",
      createdAt: "2024-08-06T10:12:18.015Z",
      content: "두 번째 게시글 내용입니다.",
      id: 2,
    },
    {
      writer: {
        image: "image3.png",
        nickname: "user3",
        id: 3,
      },
      updatedAt: "2024-08-06T11:05:32.025Z",
      createdAt: "2024-08-06T11:05:32.025Z",
      content: "세 번째 게시글 내용입니다.",
      id: 3,
    },
    {
      writer: {
        image: "image4.png",
        nickname: "user4",
        id: 4,
      },
      updatedAt: "2024-08-06T12:45:45.033Z",
      createdAt: "2024-08-06T12:45:45.033Z",
      content: "네 번째 게시글 내용입니다.",
      id: 4,
    },
    {
      writer: {
        image: "image5.png",
        nickname: "user5",
        id: 5,
      },
      updatedAt: "2024-08-06T13:30:56.041Z",
      createdAt: "2024-08-06T13:30:56.041Z",
      content: "다섯 번째 게시글 내용입니다.",
      id: 5,
    },
    {
      writer: {
        image: "image6.png",
        nickname: "user6",
        id: 6,
      },
      updatedAt: "2024-08-06T14:22:15.049Z",
      createdAt: "2024-08-06T14:22:15.049Z",
      content: "여섯 번째 게시글 내용입니다.",
      id: 6,
    },
    {
      writer: {
        image: "image7.png",
        nickname: "user7",
        id: 7,
      },
      updatedAt: "2024-08-06T15:10:27.057Z",
      createdAt: "2024-08-06T15:10:27.057Z",
      content: "일곱 번째 게시글 내용입니다.",
      id: 7,
    },
    {
      writer: {
        image: "image8.png",
        nickname: "user8",
        id: 8,
      },
      updatedAt: "2024-08-06T16:05:38.065Z",
      createdAt: "2024-08-06T16:05:38.065Z",
      content: "여덟 번째 게시글 내용입니다.",
      id: 8,
    },
    {
      writer: {
        image: "image9.png",
        nickname: "user9",
        id: 9,
      },
      updatedAt: "2024-08-06T17:02:49.073Z",
      createdAt: "2024-08-06T17:02:49.073Z",
      content: "아홉 번째 게시글 내용입니다.",
      id: 9,
    },
    {
      writer: {
        image: "image10.png",
        nickname: "user10",
        id: 10,
      },
      updatedAt: "2024-08-06T18:15:50.081Z",
      createdAt: "2024-08-06T18:15:50.081Z",
      content: "열 번째 게시글 내용입니다.",
      id: 10,
    },
  ],
};
