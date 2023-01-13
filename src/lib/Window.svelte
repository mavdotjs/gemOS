<script>
	export let left = Math.random() * 100;
	export let top = Math.random() * 100;
	
	let moving = false;
	
	function onMouseDown() {
		moving = true;
	}
	
	function onMouseMove(e) {
		if (moving) {
			left += e.movementX;
			top += e.movementY;
		}
	}
	
	function onMouseUp() {
		moving = false;
	}
	
</script>

<style>
	div.topbar {
		user-select: none;
		cursor: move;
		border: solid 1px gray;
	}
</style>
<section style="left: {left}px; top: {top}px;" class="absolute">
    <div on:mousedown={onMouseDown} class="bg-green-200 topbar">
        Name
    </div>
    <div on:resize={console.log} class="!resize flex border-2 overflow-hidden">
        <slot></slot>{Math.random()}
    </div>
</section>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />