const A_CODE = 'A'.charCodeAt(0);
const Z_CODE = 'Z'.charCodeAt(0);
const ALPHABET_SIZE = Z_CODE - A_CODE;
const ENGLISH_ALPHABET_REGEXP = RegExp('^[a-zA-Z]+$');

const isPureEnglishString = (string) => {
  return ENGLISH_ALPHABET_REGEXP.test(string);
}

const encryptCaesar = (source, shift) => {
  const realShift = shift % (ALPHABET_SIZE + 1);
  return source.split('')
    .map((letter) => {
      let newCode = letter.charCodeAt(0) + realShift;
      if (newCode > Z_CODE) {
        newCode -= ALPHABET_SIZE + 1;
      } else if (newCode < A_CODE) {
        newCode += ALPHABET_SIZE + 1;
      }
      return String.fromCodePoint(newCode);
    }).join('');
}

const decryptCaesar = (source, shift) => encryptCaesar(source, -shift);

const encryptVigenere = (source, key) => {
  let keyIterator = key[Symbol.iterator]();
  return source.split('')
    .map((letter) => {
      let keyElement = keyIterator.next();
      if (keyElement.done) {
        keyIterator = key[Symbol.iterator]();
        keyElement = keyIterator.next();
      }
      const shift = keyElement.value.charCodeAt(0) - 'A'.charCodeAt(0)
      let newCode = letter.charCodeAt(0) + shift
      if (newCode > Z_CODE) {
        newCode -= ALPHABET_SIZE + 1
      }
      return String.fromCodePoint(newCode)
    }).join('')
}

const decryptVigenere = (source, key) => {
  let keyIterator = key[Symbol.iterator]();
  return source.split('')
    .map((letter) => {
      let keyElement = keyIterator.next();
      if (keyElement.done) {
        keyIterator = key[Symbol.iterator]();
        keyElement = keyIterator.next();
      }
      const shift = keyElement.value.charCodeAt(0) - 'A'.charCodeAt(0)
      let newCode = letter.charCodeAt(0) - shift
      if (newCode < A_CODE) {
        newCode += ALPHABET_SIZE + 1
      }
      return String.fromCodePoint(newCode)
    }).join('')
}

const handleEncryptCaesarClick = () => {
  const source = $('#source').val().toUpperCase();
  const shift = parseInt($('#param').val());

  if (!isPureEnglishString(source)) {
    alert('Невалидный исходный текст!');
    return;
  }

  if (isNaN(shift)) {
    alert('Невалидный сдвиг!');
    return;
  }

  $('#result').val(encryptCaesar(source, shift));
};

const handleDecryptCaesarClick = () => {
  const source = $('#source').val().toUpperCase();
  const shift = $('#param').val();

  if (!isPureEnglishString(source)) {
    alert('Невалидный исходный текст!');
    return;
  }

  if (isNaN(shift)) {
    alert('Невалидный сдвиг!');
    return;
  }

  $('#result').val(decryptCaesar(source, shift));
};

const handleEncryptVigenereClick = () => {
  const source = $('#source').val().toUpperCase();
  const key = $('#param').val().toUpperCase();

  if (!isPureEnglishString(source)) {
    alert('Невалидный исходный текст!');
    return;
  }

  if (!isPureEnglishString(key)) {
    alert('Невалидный ключ!');
    return;
  }

  $('#result').val(encryptVigenere(source, key));
};

const handleDecryptVigenereClick = () => {
  const source = $('#source').val().toUpperCase();
  const key = $('#param').val().toUpperCase();

  if (!isPureEnglishString(source)) {
    alert('Невалидный исходный текст!');
    return;
  }

  if (!isPureEnglishString(key)) {
    alert('Невалидный ключ!');
    return;
  }

  $('#result').val(decryptVigenere(source, key));
};
