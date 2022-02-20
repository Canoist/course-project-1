import httpService from "./httpService";

const commentEndPoint = "comment/";

const commentService = {
  createComment: async (dataCom) => {
    const { data } = await httpService.put(
      commentEndPoint + dataCom._id,
      dataCom
    );
    return data;
  },
  getComment: async (pageId) => {
    const { data } = await httpService.get(commentEndPoint, {
      params: {
        orderBy: `"pageId"`,
        equalTo: `"${pageId}"`
      }
    });
    return data;
  },
  removeComment: async (commentId) => {
    const { data } = await httpService.delete(commentEndPoint + commentId);
    return data;
  }
};

export default commentService;
