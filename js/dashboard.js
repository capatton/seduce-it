$('#reddit_copy').hover(
	function() {
		var $this = $(this);
		$this.data('initialText', $this.text());
		$this.text("Let's make you interesting");
	},
	function() {
		var $this = $(this);
		$this.text($this.data('initialText'));
	}
);