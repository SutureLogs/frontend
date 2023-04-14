<script>
  import { push } from "svelte-spa-router";
  import LinkButton from "../buttons/LinkButton.svelte";
  import TextArea from "../inputs/TextArea.svelte";
  import Button from "../buttons/Button.svelte";
  import axios from "axios";
  import { store } from "../../../stores/store";
  let BASEURL = import.meta.env.VITE_BASEURL;
  export let comment = "";
  export let memberName = "";
  export let memberID = "";
  export let dontClose = false;
  export let showToggleReplies = false;
  export let toggleReplies = () => {};
  export let discussionID = "";
  export let repliesCount = 0;
  export let surgeryID = "";
  console.log("surgeyID", surgeryID);

  let isAddModalOpen = false;
  let newComment = "";
</script>

<input type="checkbox" checked={isAddModalOpen} class="modal-toggle" />
<div class="modal">
  <div class="modal-box relative">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      on:click={() => (isAddModalOpen = false)}
      class="btn btn-sm btn-circle absolute right-2 top-2"
    >
      ✕
    </div>
    <TextArea
      label="Your Reply"
      bind:value={newComment}
      styleClass="py-3"
      placeholderText="What are your thoughts?"
    />
    <Button
      buttonText="Reply"
      onClick={async () => {
        // server call with newComment and discussionID and memberID
        console.log("newComment", newComment);
        await axios.post(
          BASEURL + "/surgery/add-reply",
          {
            discussionId: discussionID,
            reply: newComment,
            surgeryId: surgeryID,
          },
          {
            headers: {
              token: $store.jwt,
            },
          }
        );

        location.reload();
      }}
    />
  </div>
</div>

<div
  class="flex flex-col gap-3 items-start {dontClose ? '' : 'border-b-2'}  py-4"
>
  <div>
    {comment}
  </div>
  <div class="flex gap-7">
    <LinkButton
      buttonText={memberName}
      onClick={() => push("/profile/" + memberID)}
    />
    <LinkButton buttonText={"Reply"} onClick={() => (isAddModalOpen = true)} />
    {#if showToggleReplies}
      <LinkButton
        buttonText={`Toggle ${repliesCount} Replies`}
        onClick={() => toggleReplies()}
      />
    {/if}
  </div>
</div>
