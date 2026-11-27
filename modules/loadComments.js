import { fetchComments } from './api.js';
import { setComments } from './comments.js';
import { formatDate } from './formatDate.js';
import { renderComments } from './render.js';

export function loadComments() {
  return fetchComments().then((apiComments) => {
    setComments(
      apiComments.map((item) => ({
        name: item.author.name,
        date: formatDate(new Date(item.date)),
        text: item.text,
        likes: item.likes,
        isLiked: item.isLiked,
        isLikeLoading: false,
      })),
    );
    renderComments();
  });
}