/**
 * @author : Heeveloper <zaqq1414@gmail.com>
 */

/*
 * Structure used for a linked list storing search-query.
 * @param {Object} elem
 * @param {Object.String} elem.key : unique index of search query.
 * @param {Object.String} elem.value : user searched query.
 */
function Node(elem) {
	this.item = elem;
	this.next = null;
	this.prev = null;
}

/* 
 * Double linked list.
 */
function DLinkedList() {
	var head, tail, length = 0;

	/*
	 * @public
	 * @function
	 */
	return {
		/*
		 * Add item to the linked list.
		 */
		addToHead: function(elem) {
			if (!elem) {
				return;
			}

			var node = new Node(elem);

			if (head) {
				node.next = head;
				head.prev = node;
			}
			head = node;

			if (!tail) {
				tail = node;
			}

			length ++;
		},

		/*
		 * Delete a node which key value is 'key' from the linked list.
		 */ 
		delete: function(key) {
			var cur = head,
			    deleted;

			while (cur) {
				if (cur.key === key) {
					var prev = cur.prev, next = cur.next;

					// Update pointer
					if (prev) {
						prev.next = next;
					}
					else {
						head = next;
					}

					if (next) {
						next.prev = prev;
					}
					else {
						tail = prev;
					}
					length --;
					deleted = key;
					break;
				}

				cur = cur.next;
			}

			return deleted;
		},

		/*
		 * Return the node which key value is 'key'.
		 */
		search: function(key) {
			var cur = head,
				found;

			while (cur) {
				if (cur.key === key) {
					found = cur;
					break;
				}
				cur = cur.next;
			}

			return found;
		},

		/*
		 * Return all items{key, value} in linked list.
		 */
		getAllItems: function() {
			var cur = head,
				returnObj = [];

			while (cur) {
				returnObj.push(cur.item);
				cur = cur.next;
			}
			return returnObj;
		},

		isEmpty: function() {
			return length === 0;
		},

		size: function() {
			return length;
		}
	}
}

export {DLinkedList};