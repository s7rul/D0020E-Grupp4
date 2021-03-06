/** Class representing a Student. */
class Group {

	constructor(name) {
		this.name = name;
		this.member_list = [];
	}

	get_socket_list() {
		var ret = [];
		for (var i = 0; i < this.member_list.length; i++){
			ret.push(this.member_list[i].get_socket());
		}
		return ret;
	}

	add_student(stud) {
		this.member_list.push(stud);
	}

	remove_student(id) {
		for (var i = 0; i < this.member_list.length; i++){
			console.log(this.member_list[i].get_id());
			if (id == this.member_list[i].get_id()){
				this.member_list.splice(i, 1);
			}
		}
	}

	to_json() {
		var ret = {
			name: this.name,
			member_list: []
		}

		for (var i = 0; i < this.member_list.length; i++){
			ret.member_list.push(this.member_list[i].name);
		}

		return ret;
	}

	class_string(){
		return "Group";
	}
}

module.exports = {Group};
