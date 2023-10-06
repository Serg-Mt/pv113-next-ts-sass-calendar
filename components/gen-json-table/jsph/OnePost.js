import { postcard } from './OnePost.module.sass';
export default function OnePost({ data: { userId, id, title, body } }) {
  return <fieldset className={postcard}>
    <legend>post #{id} author#{userId}</legend>
    <h4>{title}</h4>
    {body}
  </fieldset>;
}