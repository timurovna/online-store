export const validate = (name, value) => {
	if (name === "rating"){
				if (value > 5 || value < 1){
					return "Must be a number form 1 to 5"
				}
				else{
					return ""
				}
		}
		else if (name === "title"){
				if (value.length > 30){
					return "Must be less than 30 symbols"
				}
				else if (value=== ""){
					return "Title is required"
				}
				else{
					return ""
				}
		}
		else if (name === "description"){
				if (value.length > 500){
					return "Must be less than 500 symbols"
				}
				else if (value=== ""){
					return "Description is required"
				}
				else{
					return ""
				}
		}
		else if (name === "price"){
			if (isNaN(value) || value=== ""){
					return "Must be a number"
				}
				else{
					return ""
				}
		}

		else if (name === "category"){
			if (value=== "none"){
					return "Category is required"
				}
				else{
					return ""
				}
		}
		else if (name === "gender") {
			if (value=== "none"){
					return "Gender is required"
				}
				else{
					return ""
				}
		}
		else if (name === "available"){
			if (value=== "none"){
					return "Gender is required"
				}
				else{
					return ""
				}
		}
		else if(name === "image"){
				if (value === ""){
					return "Image is required"
				}
				else{
					return ""
				}
		}
}