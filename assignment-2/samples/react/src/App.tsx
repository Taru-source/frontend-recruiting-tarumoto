import React, { useState, useEffect } from "react";
import "./App.css";

const App: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [city, setCity] = useState("");
  const [building, setBuilding] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFormFilled, setIsFormFilled] = useState(false);

  useEffect(() => {
    setIsFormFilled(
      name !== "" &&
        email !== "" &&
        postalCode !== "" &&
        prefecture !== "" &&
        city !== ""
    );
  }, [name, email, postalCode, prefecture, city]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "正しいメールアドレスを入力してください";
    }
    if (!/^\d{7}$/.test(postalCode)) {
      newErrors.postalCode = "ハイフンを含めず7桁の半角数字で入力してください";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validate()) {
      const payload = {
        name,
        email,
        zip: postalCode,
        prefecture,
        address1: city,
        address2: building,
      };

      try {
        const response = await fetch("https://httpstat.us/201", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.status === 201) {
          alert("送信が成功しました");
        } else {
          alert("送信に失敗しました");
        }
      } catch (error) {
        alert("送信に失敗しました");
      }
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-container">
          <label>氏名</label>
          <input
            type="text"
            placeholder="(例) トレタ 太郎"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-container">
          <label>Eメール</label>
          <input
            type="email"
            placeholder="(例) yoyaku@toreta.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? "error" : ""}
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>
        <div className="form-container">
          <label>郵便番号</label>
          <input
            type="text"
            placeholder="(例) 1234567"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className={`postal-code-input ${errors.postalCode ? "error" : ""}`}
          />
          {errors.postalCode && (
            <span className="error-message">{errors.postalCode}</span>
          )}
        </div>
        <div className="form-container">
          <label>都道府県</label>
          <PrefectureSelectBox
            value={prefecture}
            onChange={(e) => setPrefecture(e.target.value)}
            className={errors.prefecture ? "error" : ""}
          />
          {errors.prefecture && (
            <span className="error-message">{errors.prefecture}</span>
          )}
        </div>
        <div className="form-container">
          <label>市区町村・番地</label>
          <input
            type="text"
            placeholder="(例) 品川区西五反田７丁目２２−１７"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="form-container">
          <label>建物名・号室</label>
          <input
            type="text"
            placeholder="(例) TOCビル 8F"
            value={building}
            onChange={(e) => setBuilding(e.target.value)}
          />
        </div>
        <div className="submit-btn-container">
          <button type="submit" disabled={!isFormFilled}>
            登録
          </button>
        </div>
      </form>
    </div>
  );
};

interface PrefectureSelectBoxProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

const PrefectureSelectBox: React.FC<PrefectureSelectBoxProps> = ({
  value,
  onChange,
}) => {
  return (
    <select value={value} onChange={onChange} required>
      <option value="">選択してください</option>
      <option value="北海道">北海道</option>
      <option value="青森県">青森県</option>
      <option value="岩手県">岩手県</option>
      <option value="宮城県">宮城県</option>
      <option value="秋田県">秋田県</option>
      <option value="山形県">山形県</option>
      <option value="福島県">福島県</option>
      <option value="茨城県">茨城県</option>
      <option value="栃木県">栃木県</option>
      <option value="群馬県">群馬県</option>
      <option value="埼玉県">埼玉県</option>
      <option value="千葉県">千葉県</option>
      <option value="東京都">東京都</option>
      <option value="神奈川県">神奈川県</option>
      <option value="新潟県">新潟県</option>
      <option value="富山県">富山県</option>
      <option value="石川県">石川県</option>
      <option value="福井県">福井県</option>
      <option value="山梨県">山梨県</option>
      <option value="長野県">長野県</option>
      <option value="岐阜県">岐阜県</option>
      <option value="静岡県">静岡県</option>
      <option value="愛知県">愛知県</option>
      <option value="三重県">三重県</option>
      <option value="滋賀県">滋賀県</option>
      <option value="京都府">京都府</option>
      <option value="大阪府">大阪府</option>
      <option value="兵庫県">兵庫県</option>
      <option value="奈良県">奈良県</option>
      <option value="和歌山県">和歌山県</option>
      <option value="鳥取県">鳥取県</option>
      <option value="島根県">島根県</option>
      <option value="岡山県">岡山県</option>
      <option value="広島県">広島県</option>
      <option value="山口県">山口県</option>
      <option value="徳島県">徳島県</option>
      <option value="香川県">香川県</option>
      <option value="愛媛県">愛媛県</option>
      <option value="高知県">高知県</option>
      <option value="福岡県">福岡県</option>
      <option value="佐賀県">佐賀県</option>
      <option value="長崎県">長崎県</option>
      <option value="熊本県">熊本県</option>
      <option value="大分県">大分県</option>
      <option value="宮崎県">宮崎県</option>
      <option value="鹿児島県">鹿児島県</option>
      <option value="沖縄県">沖縄県</option>
    </select>
  );
};

export default App;
