<script>
    import LayoutWithLogNav from "../components/LayoutWithLogNav.svelte";
    import Heading2 from "../components/design/titles/Heading2.svelte";
    import axios from "axios";
    import { onMount } from "svelte";
    import Loading from "../components/Loading.svelte";
    import { store } from "../stores/store";
    import GoBackToBrowseButton from "../components/design/buttons/GoBackToBrowseButton.svelte";
    import TextArea from "../components/design/inputs/TextArea.svelte";
    import Button from "../components/design/buttons/Button.svelte";
    let BASEURL = import.meta.env.VITE_BASEURL;

    let loading = true;
    let loadingAnswer = false;
    let answer = "";

    export let params = {};

    async function dataload() {
        loading = true;
        const res = await axios.get(
            BASEURL + "/surgery/get-scenario?id=" + params.id,
            {
                headers: {
                    token: $store.jwt,
                },
            }
        );
        // console.log(res.data);
        if (res) data = res.data.scenarios;

        // data = data.map((item) => {
        //     return { ...item, flipped: false };
        // });

        loading = false;
    }

    onMount(async () => {
        await dataload();
    });

    let data = {
        scenario: `Lorem ipsum dolor, sit amet consectetur adipisicing
                    elit. Aliquam, ullam illo quas qui expedita, exercitationem quam
                    voluptatem atque quibusdam aliquid, dolorem beatae fugit praesentium!
                    Tempore aperiam dolorum rerum esse porro.`,
        question: "What is the most common cause of death in the US?",
    };
    let verdict = {
        verdict: "",
        explanation: ``,
    };

    async function checkAnswer() {
        loadingAnswer = true;

        const res = await axios.post(
            BASEURL + "/surgery/check-scenario-answer",
            {
                surgeryId: params.id,
                scenario: data.scenario,
                answer: answer,
                question: data.question,
            },
            {
                headers: {
                    token: $store.jwt,
                },
            }
        );

        if (res) {
            verdict.explanation = res.data.scenarios.explanation;
            verdict.verdict = res.data.scenarios.verdict;
        }
        loadingAnswer = false;
    }
</script>

<LayoutWithLogNav {params}>
    {#if loading}
        <div class="h-full w-full">
            <Loading>
                <div class="animate-pulse">
                    We are generating the scenario. Please wait
                </div>
            </Loading>
        </div>
    {:else}
        <div class="p-10 h-full">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <GoBackToBrowseButton navLink={"/learn/" + params.id} />
            </div>
            <div class="py-5 max-w-screen-md mx-auto">
                <Heading2>Scenario</Heading2>
                <div class="flex flex-col mt-4">
                    <div>{data.scenario}</div>
                    <div class="mt-5">{data.question}</div>
                    <TextArea
                        bind:value={answer}
                        styleClass="mt-5"
                        label="Your answer"
                        placeholderText="What would you do?"
                    />
                    {#if verdict.verdict !== "" && verdict.explanation !== ""}
                        <div class="my-4">{verdict.verdict}</div>
                        <div>{verdict.explanation}</div>
                        <Button
                            buttonText="Retry"
                            styleClass="mt-6"
                            onClick={() => {
                                verdict = { verdict: "", explanation: "" };
                                loadingAnswer = false;
                            }}
                        />
                    {:else if loadingAnswer}
                        <div class="mt-7">
                            <Loading>Checking your answer...</Loading>
                        </div>
                    {:else}
                        <Button
                            buttonText="Check answer"
                            onClick={checkAnswer}
                            styleClass="mt-6"
                        />
                    {/if}
                </div>
            </div>
        </div>
    {/if}
</LayoutWithLogNav>
