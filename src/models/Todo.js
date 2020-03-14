var moment = require('moment');

class TodoModel {
    constructor(data = {}) {
        this.id = 0;
        this.title = '';
        this.description = '';
        this.status = 0;
        this.createdAt = moment().format('YYYY-MM-DD HH:mm') //2019-11-16 18:00

        for (const key in data) {
			if (data.hasOwnProperty(key)) {
				var element = data[key];
				this[key] = element;
			}
		}
    }
}

export { TodoModel }