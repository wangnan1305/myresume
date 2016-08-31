//将md语法``和**替换成标签
function replace(data) {

	data.forEach(function(item, index) {
		item.data.forEach(function(item2, index2) {
			if (item2.task) {
				item2.task.forEach(function(item3, index3) {
					item2.task[index3] = item3.replace(/`(.+?)`/g, '<strong>$1</strong>')
						.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
				})
			}
		})
	});
	data.forEach(function(item, index){
		if(item["module"] == "skill"){
			item.data.forEach(function (item2,index2) {
				item2.data.forEach(function (item3,index3) {
					item3.description.forEach(function (item4,index4) {
						item3.description[index4] = item4.replace(/`(.+?)`/g, '<strong>$1</strong>')
							.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')						
					})
				})
			})
		}
	})
	return data;
}
var data_handle = replace(data);