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
  import { store } from "../stores/store";
  import { onMount } from "svelte";
  import Loading from "../components/Loading.svelte";
  import axios from "axios";
  import empty from "../assets/icons/empty.png";
  import moment from "moment";

  let BASEURL = import.meta.env.VITE_BASEURL;
  let loading = false;

  onMount(async () => {
    await dataload();
  });
  async function dataload() {
    loading = true;
    const res = await axios.get(
      BASEURL + "/surgery/get-discuss?id=" + params.id,
      {
        headers: {
          token: $store.jwt,
        },
      }
    );
    loading = false;
    console.log(res.data);
    data = res.data.surgery;

    // data.surgeryID = surgeryID;
  }

  let data = {
    date: "22/3/12",
    orgName: "Org Name",
    surgeonName: "Surgeon Name",
    surgeonTitle: "Surgeon Title",
    surgeryName: "Surgery Name",
    videoLink: "",
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
            doctorId: "1",
            doctorName: "Dr. Jane Doe",
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
  <div class="modal-box relative bg-white">
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
      onClick={async () => {
        loading = true;
        await axios.post(
          BASEURL + "/surgery/add-discussion",
          {
            surgeryId: params.id,
            comment: newComment,
          },
          {
            headers: {
              token: $store.jwt,
            },
          }
        );
        await dataload();
        loading = false;
        isAddModalOpen = false;
      }}
    />
  </div>
</div>

<LayoutWithLogNav {params}>
  {#if loading}
    <div class="h-screen">
      <Loading />
    </div>
  {:else}
    <div class="grid md:grid-cols-3">
      <div class="md:col-span-2">
        <div
          class="p-10 flex flex-col md:flex-row justify-between items-center"
        >
          <LinkIconButton
            buttonText={"Go back to browse"}
            onClick={() => {
              push("/browse");
            }}
            img={left}
          />
          <div class="flex gap-2 items-center">
            <Label styleClass="opacity-50">Conducted on</Label>
            <Label>{moment(data.date).format("DD MMMM, YYYY")}</Label>
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
            class="rounded-xl {$store.blurSurgeryFilter ? 'blur-lg' : ''} "
            controls
            src={BASEURL + "/surgery/video/" + data.videoLink}
          />
          <div class="flex justify-end py-3">
            {#if !$store.blurSurgeryFilter}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <div
                on:click={() => {
                  $store.blurSurgeryFilter = true;
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6"
                >
                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                  <path
                    fill-rule="evenodd"
                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            {:else}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <div
                on:click={() => {
                  $store.blurSurgeryFilter = false;
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z"
                  />
                  <path
                    d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z"
                  />
                  <path
                    d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z"
                  />
                </svg>
              </div>
            {/if}
          </div>
        </div>
      </div>
      <div class="p-12 px-5 overflow-auto max-w-full border-l-2">
        <div class="flex justify-between items-center">
          <Label styleClass="text-primary">Discussions</Label>
          <IconButton
            icon={plus}
            styleClass="btn-sm"
            onClick={() => (isAddModalOpen = true)}
          />
        </div>
        <div class="flex flex-col gap-3 mt-7">
          {#if data.discussions.length == 0}
            <div
              class="flex flex-col gap-3 opacity-30 justify-center items-center"
            >
              <img src={empty} alt="" />
              <Label styleClass="text-primary">No discussions yet</Label>
            </div>
          {/if}
          {#each data.discussions as discussion}
            {#if discussion.replies && discussion.replies.length > 0}
              <DiscussionCard
                {...discussion}
                dontClose={true}
                showToggleReplies={true}
                toggleReplies={() => {
                  discussion.toggleReplies = !discussion.toggleReplies;
                }}
                bind:replyState={discussion.toggleReplies}
                repliesCount={discussion.replies.length}
              />

              <div class="pl-5 flex flex-col gap-3">
                {#if discussion.toggleReplies}
                  {#each discussion.replies as reply, i}
                    <DiscussionCard
                      surgeryID={discussion.surgeryID}
                      {...reply}
                      memberID={reply.doctorId}
                      memberName={reply.doctorName}
                      discussionID={discussion.discussionID}
                    />
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
  {/if}
</LayoutWithLogNav>
