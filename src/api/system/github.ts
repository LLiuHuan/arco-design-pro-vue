import axios from 'axios';

const service = axios.create();

export function getCommit(page: number) {
  return service({
    url: `https://api.github.com/repos/LLiuHuan/arco-design-pro-vue/commits?page=${page}`,
    method: 'get',
  });
}
