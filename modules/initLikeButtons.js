import { comments } from './comments.js';
import { delay } from './delay.js';

export function initLikeButtons(onUpdate) {
  const likeButtons = document.querySelectorAll('.like-button');

  for (const likeButton of likeButtons) {
    likeButton.addEventListener('click', (event) => {
      event.stopPropagation();

      const comment = comments[likeButton.dataset.index];

      if (comment.isLikeLoading) {
        return;
      }

      comment.isLikeLoading = true;
      onUpdate();

      delay(2000).then(() => {
        comment.likes = comment.isLiked ? comment.likes - 1 : comment.likes + 1;
        comment.isLiked = !comment.isLiked;
        comment.isLikeLoading = false;
        onUpdate();
      });
    });
  }
}