export default function debounce(callback: Function, timeout = 700) {
	let timer: number | null = null;
	return () => {
		if (timer) {
			window.clearTimeout(timer);
		}
		
		timer = window.setTimeout(() => {
			callback();
			timer = null;
		}, timeout);
	}
}