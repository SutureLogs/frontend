<script>
  import { pop, push } from "svelte-spa-router";
  import LayoutWithLogNav from "../components/LayoutWithLogNav.svelte";
  import LinkIconButton from "../components/design/buttons/LinkIconButton.svelte";
  import Heading2 from "../components/design/titles/Heading2.svelte";
  import left from "../assets/icons/left.png";
  import Label from "../components/design/titles/Label.svelte";
  import axios from "axios";
  import Button from "../components/design/buttons/Button.svelte";
  import { onMount } from "svelte";
  import Loading from "../components/Loading.svelte";
  import { store } from "../stores/store";
  import GoBackToBrowseButton from "../components/design/buttons/GoBackToBrowseButton.svelte";
  let currentQuestion = 0;
  let displayAnswer = false;
  let showResults = false;
  let stats = {
    correct: 0,
    incorrect: 0,
  };
  let selectedOption = null;
  let loading = true;

  export let params = {};
  let BASEURL = import.meta.env.VITE_BASEURL;

  async function dataload() {
    loading = true;
    const res = await axios.get(BASEURL + "/surgery/learn?id=" + params.id, {
      headers: {
        token: $store.jwt,
      },
    });

    if (res) data = res.data;
    loading = false;
  }

  onMount(async () => {
    await dataload();
  });

  let data = {
    quiz: [
      {
        question:
          "What does the Cochrane systematic review conclude about the use of topical antibiotics on surgical wounds?",
        options: [
          "They increase the risk of local skin reactions",
          "They decrease the risk of surgical site infections",
          "They should only be used as a preventative measure",
          "They increase the risk of antibiotic resistance",
          "They slow healing and should be avoided",
        ],
        answer: "They decrease the risk of surgical site infections",
        explanation:
          "A Cochrane systematic review published in 2016 concluded that topical antibiotics applied over certain types of surgical wounds reduce the risk of surgical site infections, when compared to no treatment or use of antiseptics. The review also did not find conclusive evidence to suggest that topical antibiotics increased the risk of local skin reactions or antibiotic resistance.",
      },
      {
        question: "What is the purpose of surgical drains?",
        options: [
          "To assess the outcome of the procedure",
          "To decrease the length of stay in the hospital",
          "To remove signs of infection",
          "To remove blood or fluid from the surgical wound",
          "To prevent PONV",
        ],
        answer: "To remove blood or fluid from the surgical wound",
        explanation:
          "Surgical drains are used to remove blood or fluid from the surgical wound during recovery. They are removed once the volume tapers off.",
      },
    ],
  };

  function checkAnswer() {
    displayAnswer = true;
    if (selectedOption === data.quiz[currentQuestion].answer) {
      stats.correct++;
    }
  }
  function nextQuestion() {
    displayAnswer = false;
    selectedOption = null;
    if (currentQuestion === data.quiz.length - 1) {
      showResults = true;
    }

    currentQuestion++;
  }
</script>

<LayoutWithLogNav {params}>
  {#if loading}
    <div class="h-full w-full">
      <Loading>
        <div class="animate-pulse">
          We are generating a quiz for you. Please wait
        </div>
      </Loading>
    </div>
  {:else}
    <div class="flex flex-col gap-2 w-full h-full items-center justify-center">
      <div class="flex flex-col h-full items-center mt-10 w-full">
        <div class="max-w-4xl w-full p-5">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <GoBackToBrowseButton />
          </div>
          <Heading2 styleClass="mt-10">Quiz</Heading2>
          {#if !showResults}
            <div class="flex flex-col">
              <Label styleClass="py-10 pb-3"
                >Question {currentQuestion + 1}</Label
              >
              <div>
                {data.quiz[currentQuestion].question}
              </div>

              <div class="flex flex-col gap-3 my-4">
                {#each data.quiz[currentQuestion].options as option, i}
                  <label class="p-4 border flex gap-3 items-center rounded">
                    <input
                      type="radio"
                      bind:group={selectedOption}
                      value={option}
                      disabled={displayAnswer}
                      name={"op"}
                    />
                    <div>{option}</div>
                    <div class="ml-auto">
                      {#if displayAnswer}
                        {#if option === data.quiz[currentQuestion].answer}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6 text-green-500"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                        {:else}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6 text-red-500"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        {/if}
                      {/if}
                    </div>
                  </label>
                {/each}
              </div>
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              {#if !displayAnswer}
                <div
                  on:click={() => {
                    checkAnswer();
                  }}
                  class="flex gap-3 items-center ml-auto cursor-pointer hover:text-primary hover:scale-95 transition"
                >
                  <Label styleClass="hover:text-primary">Check Option</Label>
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
                      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                    />
                  </svg>
                </div>
              {/if}
              {#if displayAnswer}
                <Label styleClass="py-10 pb-3">Answer & explanation</Label>
                <div class="p-4 rounded border">
                  {data.quiz[currentQuestion].answer}
                </div>
                <div class="py-3">
                  {data.quiz[currentQuestion].explanation}
                </div>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div
                  on:click={() => {
                    nextQuestion();
                  }}
                  class="flex gap-3 items-center ml-auto mb-5 cursor-pointer hover:text-primary hover:scale-95 transition"
                >
                  <Label styleClass="hover:text-primary">Next question</Label>
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
                      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                    />
                  </svg>
                </div>
              {/if}
            </div>
          {:else}
            <div class="flex w-full gap-3 justify-center items-center h-full">
              <div
                class="flex border flex-1 flex-col items-center justify-center rounded-xl p-2"
              >
                <div class="text-xl font-bold">{data.quiz.length}</div>
                <div class="text-sm">Total Questions</div>
              </div>
              <div
                class="flex border flex-1 flex-col items-center justify-center rounded-xl p-2"
              >
                <div class="text-xl font-bold">{stats.correct}</div>
                <div class="text-sm">Correct Answers</div>
              </div>
              <div
                class="flex border flex-1 flex-col items-center justify-center rounded-xl p-2"
              >
                <div class="text-xl font-bold">
                  {data.quiz.length - stats.correct}
                </div>
                <div class="text-sm">Incorrect Answers</div>
              </div>
            </div>
            <div>
              <Button
                buttonText="Retake Quiz"
                onClick={() => {
                  pop();
                }}
              />
            </div>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</LayoutWithLogNav>
