<script>
  import LinkIconButton from "../buttons/LinkIconButton.svelte";
  import plus from "../../../assets/icons/plusblack.png";
  import TextInput from "../inputs/TextInput.svelte";
  import LinkButton from "../buttons/LinkButton.svelte";
  import toast from "svelte-french-toast";
  import { store } from "../../../stores/store";
  import axios from "axios";
  let BASEURL = import.meta.env.VITE_BASEURL;

  export let data = [
    {
      memberUsername: "Dr. John Doe",
      memberRole: "Surgeon",
      memberStatus: "",
    },
  ];
  let isEditModalOpen = false;
  let currentMember = {
    memberUsername: "",
    memberRole: "",
    memberStatus: "",
  };
</script>

<input type="checkbox" checked={isEditModalOpen} class="modal-toggle" />
<div class="modal">
  <div class="modal-box relative">
    <button
      on:click={() => {
        isEditModalOpen = false;
      }}
      class="btn btn-sm btn-circle absolute right-2 top-2">✕</button
    >
    <TextInput label="Username" bind:value={currentMember.memberUsername} />
    <TextInput label="Role" bind:value={currentMember.memberRole} />
    <div class="flex justify-end mt-4 gap-2">
      <LinkButton
        styleClass="text-primary py-0 border px-3 rounded-full"
        buttonText="Cancel"
        onClick={() => {
          isEditModalOpen = false;
        }}
      />
      <LinkButton
        styleClass="text-primary py-0 border px-3 rounded-full"
        buttonText="Save"
        onClick={async () => {
          if (
            currentMember.memberUsername === "" ||
            currentMember.memberRole === ""
          ) {
            toast.error("Please fill in all fields");
            return;
          }
          if (
            data.find(
              (member) => member.memberUsername === currentMember.memberUsername
            )
          ) {
            toast.error("Username already exists");
            return;
          }
          // server call to check if username exists
          const response = await axios.get(
            BASEURL +
              `/doctor/username-exists?username=${currentMember.memberUsername}`
          );
          if (response.data.exists === false) {
            toast.error("Username does not exist");
            return;
          }

          data = [
            ...data,
            {
              memberUsername: currentMember.memberUsername,
              memberRole: currentMember.memberRole,
              memberStatus: "Invited",
            },
          ];
          currentMember = {
            memberUsername: "",
            memberRole: "",
            memberStatus: "",
          };
          isEditModalOpen = false;
        }}
      />
    </div>
  </div>
</div>

<div class="overflow-x-auto">
  <table class="table w-full">
    <!-- head -->
    <thead>
      <tr>
        <th />
        <th>Username</th>
        <th>Role</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <!-- row 1 -->
      {#each data as member, i}
        <tr>
          <td>{i + 1}</td>
          <td>{member.memberUsername}</td>
          <td>{member.memberRole}</td>
          <td> {member.memberStatus}</td>
          <td class="flex gap-4 items-center">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-4 h-4"
              >
                <path
                  d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"
                />
              </svg>
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
              on:click={() => {
                if ($store.username === member.memberUsername) {
                  toast.error("You cannot remove yourself");
                  return;
                }
                data = data.filter((m) => {
                  return m.memberUsername !== member.memberUsername;
                });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-5 h-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <div class="flex justify-end gap-3 p-3">
    <LinkIconButton
      buttonText="Add Member"
      img={plus}
      onClick={() => {
        isEditModalOpen = true;
      }}
    />
  </div>
</div>
