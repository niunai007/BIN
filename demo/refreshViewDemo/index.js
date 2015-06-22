define(
	["common/demoView", "bin/common/refreshView", "bin/util/osUtil", "text!refreshViewDemo/view0.html", "text!refreshViewDemo/view1.html"],
	function(Base, RefreshView, osUtil, view0Html, view1Html)
	{
		var Class = {};

		Class.posGenHTML = function()
		{
			this._refreshView = new RefreshView({elem:this.$("#refreshView"), onRefresh:function(){this._onRefresh()}.bind(this)});
			this._refreshResult = 0;
		}

		Class._onRefresh = function()
		{
			var self = this;
			osUtil.delayCall(function()
			{
				if(self._refreshResult == 0)
				{
					self.$html("#refreshContent", view0Html);

					self._refreshView.refreshDone();
				}
				else if(self._refreshResult == 1)
				{
					self.$html("#refreshContent", view1Html);
					self.$("#clickMe").on("click", function(){self.goBack()});

					self._refreshView.refreshDone();
				}
				else
				{
					self._refreshView.refreshDone(true);
				}

				++ self._refreshResult;

				self._refreshResult %= 3;
				
				
			}, 1000);
		}

		Class.asyncPosGenHTML = function()
		{
			this._refreshView.refresh(true);
		}

		return Base.extend(Class);
	}
);