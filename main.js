// let processButton = document.getElementById('processButton')
// let textArea = document.getElementById('questionInput')
// let dropdownQuestion = document.querySelectorAll('.dropdown-item')
// let dropdownVariant = document.querySelectorAll('.dropdown-v')
// let questionsContainer = document.getElementById('questions-container')
// let downloadButton = document.getElementById('downloadButton')
// let questions = []
// let selectedVariant = 0
// let selectedCount = 0

// //
// // Dropdown question data
// dropdownQuestion.forEach(item => {
// 	item.addEventListener('click', function (event) {
// 		event.preventDefault()
// 		selectedCount = parseInt(this.getAttribute('data-value'), 10)
// 		// console.log('Selected count:', selectedCount) // Tanlangan qiymatni tekshirish
// 	})
// })
// // Dropdown variant data
// dropdownVariant.forEach(item => {
// 	item.addEventListener('click', function (event) {
// 		event.preventDefault()
// 		selectedVariant = parseInt(this.getAttribute('data-value'), 10)
// 		// console.log('Selected count:', selectedVariant)
// 	})
// })

// // textArea dagi malumotlarni olish
// processButton.addEventListener('click', () => {
// 	let input = textArea.value
// 	let lines = input.split('\n')
// 	let currentQuestion = null

// 	// Har bir qator bo'ylab
// 	lines.forEach(line => {
// 		line = line.trim()
// 		if (line === '') {
// 			return // Bo'sh qatorlarni o'tkazib yuborish
// 		}
// 		if (!line.startsWith('-')) {
// 			// Yangi savol
// 			if (currentQuestion) {
// 				questions.push(currentQuestion)
// 			}
// 			currentQuestion = {
// 				question: line,
// 				options: [],
// 			}
// 		} else {
// 			// To'g'ri savol uchun variant
// 			let isCorrect = line.includes('*')
// 			currentQuestion.options.push({
// 				text: line.replace('*', '').trim(),
// 				correct: isCorrect,
// 			})
// 		}
// 	})
// 	// Oxirgi savolni qo'shish
// 	if (currentQuestion) {
// 		questions.push(currentQuestion)
// 	}
// 	// =====================generate call
// 	if (selectedVariant === 0) {
// 		alert('Variantlar sonini tanlang')
// 	} else if (selectedCount === 0) {
// 		alert('Savollar sonini tanlang')
// 	} else {
// 		generateVariantFunction(questions, selectedVariant, selectedCount)
// 	}
// })
// // -----------------------------------------------------------------------GENERATE
// function generateVariantFunction(e_arr, numVariants, selectedCount) {
// 	let shuffleArray = array => {
// 		let shuffled = array.slice() // Original massivni nusxalash
// 		for (let i = shuffled.length - 1; i > 0; i--) {
// 			let j = Math.floor(Math.random() * (i + 1))
// 			;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]] // Elementlarni almashish
// 		}
// 		return shuffled
// 	}

// 	// Variantlarni yaratish
// 	let generateVariants = (e_arr, numVariants, questionsNumber) => {
// 		let variants = []
// 		for (let i = 0; i < numVariants; i++) {
// 			let shuffledQuestions = shuffleArray(e_arr).slice(0, questionsNumber)
// 			let variant = shuffledQuestions.map(question => ({
// 				question: question.question,
// 				options: shuffleArray(question.options), // Variantlarni ham tasodifiy tartibda
// 			}))
// 			variants.push(variant)
// 		}
// 		return variants
// 	}

// 	// Variantlarni yaratish va natijani ko'rsatish
// 	let variantsCall = generateVariants(e_arr, numVariants, selectedCount)
// 	// =================================================================
// 	// --===============================================================

// 	variantsCall.forEach((variant, index) => {
// 		// Variant uchun quti yaratish
// 		const card = document.createElement('div')
// 		card.className = 'question-card'

// 		// Variantning birinchi savolini yaratish
// 		card.textContent = `${index + 1} - ${variant[0].question}`

// 		// Variantning birinchi savolining variantlarini yaratish
// 		const olOptions = document.createElement('ol')

// 		variant[0].options.forEach(option => {
// 			const liOption = document.createElement('li')
// 			liOption.textContent = option.text
// 			olOptions.appendChild(liOption)
// 		})

// 		card.appendChild(olOptions)
// 		questionsContainer.appendChild(card)
// 		// -----------if page full add new page
// 	})
// }
// // =================================================================
// // --===============================================================
// downloadButton.addEventListener('click', () => {
// 	downloadAsPDF()
// 	console.log('function working')
// })
// function downloadAsPDF() {
// 	// QUESTIONS tagi ichidagi kontentni olish
// 	const element = document.getElementById('questions-container')

// 	// PDF opsiyalarini sozlash
// 	var opt = {
// 		margin: 0.5,
// 		filename: 'questions.pdf',
// 		image: { type: 'jpeg', quality: 0.98 },
// 		html2canvas: { scale: 2, logging: true, letterRendering: true },
// 		jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
// 	}

// 	// HTML2PDF funksiyasini chaqirish
// 	html2pdf().from(element).set(opt).save()
// }
// DOM elementlarini tanlash
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
const processButton = document.getElementById('processButton')
const textArea = document.getElementById('questionInput')
const dropdownQuestionItems = document.querySelectorAll('.dropdown-item')
const dropdownVariantItems = document.querySelectorAll('.dropdown-v')
const questionsContainer = document.getElementById('questions-container')
const downloadButton = document.getElementById('downloadButton')

// Global o'zgaruvchilar
let questions = []
let selectedVariantCount = 0
let selectedQuestionCount = 0

// Dropdown elementlari uchun event listener'lar
function setupDropdownListeners() {
	dropdownQuestionItems.forEach(item => {
		item.addEventListener('click', function (event) {
			event.preventDefault()
			selectedQuestionCount = parseInt(this.getAttribute('data-value'), 10)
		})
	})

	dropdownVariantItems.forEach(item => {
		item.addEventListener('click', function (event) {
			event.preventDefault()
			selectedVariantCount = parseInt(this.getAttribute('data-value'), 10)
		})
	})
}

// TextArea'dan ma'lumotlarni olish va qayta ishlash
function processTextAreaInput() {
	const input = textArea.value
	const lines = input.split('\n')
	let currentQuestion = null

	lines.forEach(line => {
		line = line.trim()
		if (line === '') return

		if (!line.startsWith('-')) {
			if (currentQuestion) questions.push(currentQuestion)
			currentQuestion = { question: line, options: [] }
		} else {
			const isCorrect = line.includes('*')
			currentQuestion.options.push({
				text: line.replace('*', '').trim(),
				correct: isCorrect,
			})
		}
	})

	if (currentQuestion) questions.push(currentQuestion)
}

// Massivni tasodifiy tartibda aralashtirish
function shuffleArray(array) {
	const shuffled = array.slice()
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
	}
	return shuffled
}

// Variantlarni yaratish
function generateVariants(questions, variantCount, questionCount) {
	const variants = []
	for (let i = 0; i < variantCount; i++) {
		const shuffledQuestions = shuffleArray(questions).slice(0, questionCount)
		const variant = shuffledQuestions.map(question => ({
			question: question.question,
			options: shuffleArray(question.options),
		}))
		variants.push(variant)
	}
	return variants
}

// Variantlarni HTML elementlarga aylantirib chiqarish
function renderVariants(variants) {
	questionsContainer.innerHTML = '' // Avvalgi kontentni tozalash
	variants.forEach((variant, index) => {
		const card = document.createElement('div')
		card.className = 'question-card'
		card.textContent = `${index + 1} - ${variant[0].question}`

		const olOptions = document.createElement('ol')
		variant[0].options.forEach(option => {
			const liOption = document.createElement('li')
			liOption.textContent = option.text
			olOptions.appendChild(liOption)
		})

		card.appendChild(olOptions)
		questionsContainer.appendChild(card)
	})
}

// PDF yuklab olish funksiyasi
function downloadAsPDF() {
	const element = document.getElementById('questions-container')
	const opt = {
		margin: 0.5,
		filename: 'questions.pdf',
		image: { type: 'jpeg', quality: 0.98 },
		html2canvas: { scale: 2, logging: true, letterRendering: true },
		jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
	}
	html2pdf().from(element).set(opt).save()
}

// Asosiy funksiya
function generateVariantFunction() {
	if (selectedVariantCount === 0) {
		alert('Variantlar sonini tanlang')
		return
	}
	if (selectedQuestionCount === 0) {
		alert('Savollar sonini tanlang')
		return
	}

	processTextAreaInput()
	const variants = generateVariants(
		questions,
		selectedVariantCount,
		selectedQuestionCount
	)
	renderVariants(variants)
}
// Event listener'larni o'rnatish
setupDropdownListeners()
processButton.addEventListener('click', generateVariantFunction)
downloadButton.addEventListener('click', downloadAsPDF)
