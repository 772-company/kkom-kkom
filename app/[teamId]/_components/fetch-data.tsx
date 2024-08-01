interface fetchDataProps {
  teamId: string;
}

const fetchData = async ({ teamId }: fetchDataProps) => {
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsInRlYW1JZCI6IjYtNyIsInNjb3BlIjoiYWNjZXNzIiwiaWF0IjoxNzIyMzU2NTAxLCJleHAiOjE3MjIzNjAxMDEsImlzcyI6InNwLWNvd29ya2VycyJ9.I-IsDsRRy36yRlNpHQ4oARRsRWpsl425mB4zR8Qg8qk";

  try {
    const response = await fetch(
      `https://fe-project-cowokers.vercel.app/6-7/groups/${teamId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 토큰 추가
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export default fetchData;
