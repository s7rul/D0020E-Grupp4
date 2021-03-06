var student = require('./student.js');
var queue = require('./queue.js');
var group = require('./group.js');

/** Class representing a Lecture. */
class Lecture {
	constructor(){
		this.students = [];
		this.queues = [];
		this.groups = [];
	}

	get_student_by_id(id){
		for (var i = 0; i < this.students.length; i++){
			if (this.students[i].session_id == id){
				return this.students[i];
			}
		}
		return null;
	}

	student_exist(id){
		if (this.get_student_by_id(id) == null){
			return false;
		}
		return true;
	}

	add_student(id, name, socket){
		var stud = this.get_student_by_id(id);
		if (stud == null){
			var stud = new student.Student(id, name, socket);
			this.students.push(stud);
		} else {
			stud.set_name(name);
		}
	}

	get_student_name(id){
		var student = this.get_student_by_id(id);
		if (student == null){
			return "Unknown";
		}
		return student.get_name();
	}

	get_queue(name){
		for (var i = 0; i < this.queues.length; i++){
			if (this.queues[i].name == name){
				return this.queues[i];
			}
		}
		return null;
	}

	get_all_queues(){
		return this.queues;
	}

	remove_ticket_from_queue(studID){
		for (var i = 0; i < this.queues.length; i++){
			if (this.queues[i].remove_ticket(studID) == true) {
				return true;
			}
		}
		return false;
	}

	add_queue(name){
		var queue_e = this.get_queue(name);
		if (queue_e == null){
			var q = new queue.queue(name);
			this.queues.push(q);
		} else {
			return;
		}
	}

	remove_queue(name){
		for (var i = 0; i < this.queues.length; i++){
			if (this.queues[i].name == name){
				this.queues.splice(i, 1);
			}
		}
		return;
	}

	get_group(name){
		for (var i = 0; i < this.groups.length; i++){
			if (this.groups[i].name == name){
				return this.groups[i];
			}
		}
		return null;
	}

	add_group(name){
		var group_e = this.get_group(name);
		if (group_e == null){
			var q = new group.Group(name);
			this.groups.push(q);
		} else {
			return;
		}
	}

	remove_group(name){
		for(var i = 0; i < this.groups.length; i++){
			if(name == this.groups[i].name){
				this.groups.splice(i, 1);
			}
		}
	}

	get_queue_json() {
		var ret = [];
		for (var i = 0; i < this.queues.length; i++){
			ret.push(this.queues[i].to_json());
		}
		return ret;
	}

	get_group_names_json() {
		var ret = [];
		for (var i = 0; i < this.groups.length; i++){
			ret.push(this.groups[i].name);
		}
		return ret;
	}

	get_groups_json() {
		var ret = [];
		for (var i = 0; i < this.groups.length; i++){
			ret.push(this.groups[i].to_json());
		}
		return ret;
	}

	get_group_by_student_id(id) {
		for (var i = 0; i < this.groups.length; i++){
			for (var j = 0; j < this.groups[i].member_list.length; j++){
				if (this.groups[i].member_list[j].get_id() == id){
					return this.groups[i];
				}
			}
		}
		return null;
	}
}

module.exports = {Lecture};
