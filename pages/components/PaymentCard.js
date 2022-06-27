import React, { useState, useEffect } from 'react'
import styles from '../../styles/Card.module.css'


export default function PaymentCard() {


    const [cardNumber, setCardNumber] = useState('')
    const [expiresDate, setExpiresDate] = useState('')
    const [CVV, setCVV] = useState('')
    const [amount, setAmount] = useState('0')
    const [onFocusCN, setOnFocusCN] = useState()
    const [onFocusED, setOnFocusED] = useState()
    const [onFocusCVV, setOnFocusCVV] = useState()
    const [onFocusAM, setOnFocusAM] = useState()
    const [active, setActive] = useState(0)

    async function fetchData() {
        if (active !== 0) {
            const res = await fetch('/api/payment', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: active
            })
            const data = await res.json()

            if (!!data) {
                console.log({ id: data.userDto.id, amount: data.userDto.amount });
                setCardNumber('')
                setExpiresDate('')
                setCVV('')
                setAmount('0')
            }
        }
    }

    useEffect(() => {

        const buttonStyle = document.getElementById('superButton')  
        if (cardNumber.length === 19 && expiresDate.length === 7 && CVV.length === 3 && amount != '0') {
            setActive(JSON.stringify({ cardNumber, expiresDate, CVV, amount }))
            buttonStyle.className = styles.button
        }
        else {
            setActive(0)
            buttonStyle.className = styles.buttonInactive
        }
    }, [cardNumber, expiresDate, CVV, amount])

    useEffect(() => {
        if (!!cardNumber) {
            if (cardNumber.length === 4 || cardNumber.length === 9 || cardNumber.length === 14)
                setCardNumber(cardNumber + ' ')
        }
        document.getElementById('card-number').value = cardNumber
    }, [cardNumber])

    useEffect(() => {
        if (!!expiresDate) {

            const nums = expiresDate.split('/')
            if (expiresDate.length === 2) {

                if (parseInt(nums[0]) > 12) {
                    setExpiresDate('12/')
                }
                else setExpiresDate(nums[0] + '/')
                if (parseInt(nums[0]) <= 0) {
                    setExpiresDate('01/')
                }
            }
            if (expiresDate.length === 7) {
                const date = new Date()
                if (nums[1] > date.getFullYear() + 4) {
                    setExpiresDate(nums[0] + '/' + (date.getFullYear() + 4))
                }
                else if (nums[1] < date.getFullYear()) {
                    if (nums[0] < date.getMonth()) {
                        setExpiresDate('0' + date.getMonth() + '/' + date.getFullYear())
                    }
                    else {
                        setExpiresDate(nums[0] + '/' + (date.getFullYear()))
                    }
                }
                else setExpiresDate(nums[0] + '/' + nums[1])
            }
        }
        document.getElementById('expires-date').value = expiresDate
    }, [expiresDate])


    useEffect(() => {
        const number = document.getElementById('amount-data').value
        if (number.length === 0) {
            setAmount('0')
        }
    }, [amount])

    useEffect(() => {
        if (onFocusED === false) {
            document.getElementById('expires-date').focus()
        }
        else {
            document.getElementById('expires-date').blur()
            setOnFocusED(false)
        }
    }, [onFocusED])

    useEffect(() => {
        if (onFocusCVV === false) {
            document.getElementById('cvv-code').focus()
        }
        else {
            document.getElementById('cvv-code').blur()
            setOnFocusCVV(false)
        }
    }, [onFocusCVV])

    useEffect(() => {
        if (onFocusAM === false) {
            document.getElementById('amount-data').focus()
        }
        else {
            document.getElementById('amount-data').blur()
            setOnFocusAM(false)
        }
    }, [onFocusAM])

    useEffect(() => {
        if (onFocusCN === false) {
            document.getElementById('card-number').focus()

        }
        else {
            document.getElementById('card-number').blur()
            setOnFocusCN(false)
        }
    }, [onFocusCN])

    function validateNums(event, check) {
        let result

        if (check) {
            if (event.indexOf('/') !== 2) {
                if (event.indexOf(' ') === 4 || event.indexOf(' ') === 9 || event.indexOf(' ') === 14) {
                    result = event.replace(/[^0-9/ ]/, '')
                }
                else {
                    result = event.replace(/[^0-9]/, '')
                }
            }
            else result = event.replace(/[^0-9\/]/, '')
        }
        else if (event.indexOf('0') === 0) {
            let _t = event.replace(/[^0-9]/, '')
            result = _t - '0'
        }
        else { result = event.replace(/[^0-9]/, '') }

        return result
    }

    return (
        <>
            <div className={styles.card}>
                <p className={styles.textHigh}>Payment method</p>
                <div className={styles.superField} onClick={() => setOnFocusCN(!onFocusCN)}>
                    <input type='tel' pattern="[0-9]" id='card-number' className={styles.inputField} maxLength={19} onChange={e => ((e.target.value.length < cardNumber.length) && (e.target.value.length === 4 || e.target.value.length === 9 || e.target.value.length === 14)) ? setCardNumber(e.target.value.slice(0, -1)) : setCardNumber(validateNums(e.target.value, true))} value={cardNumber} placeholder=' ' required />
                    <label htmlFor='card-number' className={styles.labelFor}>Card number</label>
                </div>
                <div className={styles.doubleField}>
                    <div className={styles.superField} onClick={() => setOnFocusED(!onFocusED)}>
                        <input type='tel' pattern="[0-9]" id='expires-date' className={styles.inputField} maxLength={7} onChange={e => ((e.target.value.length < expiresDate.length) && (e.target.value.length == 2)) ? setExpiresDate(e.target.value.slice(0, -1)) : setExpiresDate(validateNums(e.target.value, true))} placeholder=' ' required />
                        <label htmlFor='expires-date' className={styles.labelFor}>MM/YYYY</label>
                    </div>
                    <div className={styles.superField} onClick={() => setOnFocusCVV(!onFocusCVV)}>
                        <input type='tel' pattern="[0-9]" id='cvv-code' className={styles.inputField} maxLength={3} onChange={e => setCVV(validateNums(e.target.value, true))} value={CVV} placeholder=' ' required />
                        <label htmlFor='cvv-code' className={styles.labelFor}>CVV</label>
                    </div>
                </div>
                <div className={styles.superField} onClick={() => setOnFocusAM(!onFocusAM)}>
                    <input type='tel' pattern="[0-9]" id='amount-data' className={styles.inputField} maxLength={6} onChange={e => setAmount(validateNums(e.target.value, false))} value={amount} placeholder=' ' required />
                    <label htmlFor='amount-data' className={styles.labelFor}>Amount</label>
                </div>




                <div className={styles.buttonInactive} id='superButton' onClick={() => fetchData()}>
                    Pay
                </div>
            </div>
        </>
    )
}