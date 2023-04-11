<script>
  // @ts-nocheck

  import left from "../assets/icons/left.png";
  import plus from "../assets/icons/plus.png";
  import { push } from "svelte-spa-router";
  import LayoutWithLogNav from "../components/LayoutWithLogNav.svelte";
  import LinkIconButton from "../components/design/buttons/LinkIconButton.svelte";
  import Heading2 from "../components/design/titles/Heading2.svelte";
  import Label from "../components/design/titles/Label.svelte";
  import Subheading from "../components/design/titles/Subheading.svelte";
  import DiscussionCard from "../components/design/cards/DiscussionCard.svelte";
  import IconButton from "../components/design/buttons/IconButton.svelte";
  import TextArea from "../components/design/inputs/TextArea.svelte";
  import Button from "../components/design/buttons/Button.svelte";

  let data = {
    date: "22/3/12",
    orgName: "Org Name",
    surgeonName: "Surgeon Name",
    surgeonTitle: "Surgeon Title",
    surgeryName: "Surgery Name",
    discussions: [
      {
        discussionID: "asd",
        toggleReplies: false,
        userID: "1",
        memberName: "Dr. John Doe",
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, provident ab molestiae magni aliquid, unde voluptates quod ad adipisci eos ipsam animi officia. Sint nam ipsa consequatur illo dolor obcaecati!",
        replies: [
          {
            userID: "1",
            memberName: "Dr. Jane Doe",
            comment:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, provident ab molestiae magni aliquid, unde voluptates quod ad adipisci eos ipsam animi officia. Sint nam ipsa consequatur illo dolor obcaecati!",
          },
        ],
      },
      {
        discussionID: "asd",
        toggleReplies: false,
        userID: "1",
        memberName: "Dr. John Doe",
        comment:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, provident ab molestiae magni aliquid, unde voluptates quod ad adipisci eos ipsam animi officia. Sint nam ipsa consequatur illo dolor obcaecati!",
      },
    ],
  };
  let isAddModalOpen = false;
  let newComment = "";
  export let params;
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
      label="Your Comment"
      bind:value={newComment}
      styleClass="py-3"
      placeholderText="What are your thoughts?"
    />
    <Button
      buttonText="Reply"
      onClick={() => {
        // server call with newComment and memberID
      }}
    />
  </div>
</div>

<LayoutWithLogNav {params}>
  <div class="grid grid-cols-3">
    <div class="col-span-2">
      <div class="p-10 flex flex-col md:flex-row justify-between items-center">
        <LinkIconButton
          buttonText={"Go back to browse"}
          onClick={() => {
            push("/browse");
          }}
          img={left}
        />
        <div class="flex gap-2 items-center">
          <Label styleClass="opacity-50">Conducted on</Label>
          <Label>{data.date}</Label>
        </div>
      </div>
      <div class="bg-slate-100 p-10">
        <Label>{data.orgName}</Label>
        <Heading2 styleClass="mt-2">{data.surgeryName}</Heading2>
        <div class="flex gap-3 items-center mt-3">
          <Subheading>{data.surgeonName}</Subheading>
          <div class="w-2 h-2 bg-primary rounded-full" />
          <Subheading>{data.surgeonTitle}</Subheading>
        </div>
      </div>
      <!-- svelte-ignore a11y-media-has-caption -->
      <div class="p-10 pt-5">
        <video
          class="rounded-xl"
          controls
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
        />
      </div>
    </div>
    <div class="p-12 px-5 overflow-auto max-w-full">
      <div class="flex justify-between items-center">
        <Label styleClass="text-primary">Discussions</Label>
        <IconButton
          icon={plus}
          styleClass="btn-sm"
          onClick={() => (isAddModalOpen = true)}
        />
      </div>
      <div class="flex flex-col gap-3 mt-7">
        {#each data.discussions as discussion}
          {#if discussion.replies && discussion.replies.length > 0}
            <DiscussionCard
              {...discussion}
              dontClose={true}
              showToggleReplies={true}
              toggleReplies={() => {
                discussion.toggleReplies = !discussion.toggleReplies;
              }}
              repliesCount={discussion.replies.length}
            />

            <div class="pl-5">
              {#if discussion.toggleReplies}
                {#each discussion.replies as reply, i}
                  {#if i == discussion.replies.length - 1}
                    <DiscussionCard
                      {...reply}
                      dontClose={false}
                      discussionID={discussion.discussionID}
                    />
                  {:else}
                    <DiscussionCard
                      {...reply}
                      dontClose={true}
                      discussionID={discussion.discussionID}
                    />
                  {/if}
                {/each}
              {/if}
            </div>
          {:else}
            <DiscussionCard {...discussion} dontClose={false} />
          {/if}
        {/each}
      </div>
    </div>
  </div>
</LayoutWithLogNav>
