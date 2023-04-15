<script>
  import broken from "../assets/broken.png";
  import logo from "../assets/logoblack.png";
</script>

<div class="flex h-screen justify-center items-center gap-3 flex-col">
  <div class="flex gap-2 items-center p-10 justify-center">
    <img src={logo} class="w-10 object-contain" alt="" />
    <div class="font-black text-2xl">
      Suture<span class="text-primary">Logs</span>
    </div>
  </div>
  <img src={broken} class="w-32 opacity-50" alt="" />
  <div>This web link does not exist</div>
</div>
