import { FormEvent, useState } from "react";

export default function FormWithoutReactHookForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // 处理提交中的状态
  const [isSubmitting, setIsSubmitting] = useState(false)
  // 处理错误
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsSubmitting(true)

    if(password !== confirmPassword) {
      setErrors(['两次密码不一样'])
      setIsSubmitting(false)
      return
    }

    await new Promise(resolve => setTimeout(resolve, 1000))

    setEmail('');
    setPassword('')
    setConfirmPassword('')
    setIsSubmitting(false)
  }

  // 受控模式
  return (
    <form onSubmit={handleSubmit}
      className="flex flex-col gay-y-2 p-4"
    >
      {
        errors.length > 0 && (
          <ul>
            {errors.map((error) => (
              <li
                key={error}
                className="bg-red-100 text-red-500 px-4 py-2 rounded"
              >
                {error}
              </li>
            ))}
          </ul>
        )
      }
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        required
        placeholder="Email"
        className="px-4 py-2 rounded shadow-sm ring-1 ring-inset ring-gray-300"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        required
        placeholder="Password"
        className="px-4 py-2 rounded shadow-sm ring-1 ring-inset ring-gray-300"
      />
      <input
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        type="password"
        required
        placeholder="Confirm Password"
        className="px-4 py-2 rounded shadow-sm ring-1 ring-inset ring-gray-300"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-indigo-600 disabled:bg-gray-500 py-2 rounded text-white"
      >
        注册
      </button>
    </form>
  )
}