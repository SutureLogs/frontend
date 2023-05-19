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
  export let showToggleReplies = false;
  export let toggleReplies = () => {};
  export let discussionID = "";
  export let repliesCount = 0;
  export let surgeryID = "";
  export let replyState = true;
  let isAddModalOpen = false;
  let newComment = "";
</script>

<input type="checkbox" checked={isAddModalOpen} class="modal-toggle" />
<div class="modal">
  <div class="modal-box relative bg-white">
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
        isAddModalOpen = false;
        window.location.reload();
      }}
    />
  </div>
</div>

<div class="flex flex-col gap-3 items-start border rounded">
  <div class="p-4">
    {comment}
  </div>
  <div class="flex border-t w-full px-4 pr-0">
    <LinkButton
      buttonText={memberName}
      onClick={() => push("/profile/" + memberID)}
    />
    <button
      class=" px-2 ml-auto border-l border-r"
      on:click={() => (isAddModalOpen = true)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-5 h-5"
      >
        <path
          fill-rule="evenodd"
          d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    {#if showToggleReplies}
      <div class="flex gap-3 items-center px-2">
        <div class="flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
          <span>{repliesCount}</span>
        </div>
        {#if replyState}
          <button on:click={toggleReplies}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5"
            >
              <path
                fill-rule="evenodd"
                d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        {:else}
          <button on:click={toggleReplies}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5"
            >
              <path
                fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        {/if}
      </div>
    {/if}
  </div>
</div>
